<script setup lang="ts">
import Pagenation from '@/components/Pagenation.vue'
import type PagenationModel from '@/models/PagenationModel'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useModal } from '@/composables/ModalComposable'
import type QueryModel from '@/models/QueryModel'
import PagenationHelper from '@/helpers/PagenationHelper'
import OrderModel from '@/models/OrderModel'
import Modal from '../../views/common/Modal.vue'
import DateSearchtingForm from '@/components/DateSearchtingForm.vue'
import type APIResponseModel from '@/models/ApiResponseModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import stores from '@/stores/Store'
import OrderStatusHelper from '@/helpers/OrderStatusHelper'
import { format } from 'date-fns'
import { UserModel } from '@/models/AccountInforModel'
import OrderDetail from '../../components/admin/OrderDetail.vue'
import AssignJobs from '../../components/admin/AssignJobs.vue'
import AssignmentModel from '@/models/AssignmentModel'

const route = useRoute()
const modal = useModal()

const pagenation = reactive<PagenationModel<OrderModel[]>>({
  currentPageNumber: route.query.page
    ? Number(route.query.page)
    : PagenationHelper.CURRENT_PAGE_NUMBER,
  offset: route.query.limit ? Number(route.query.limit) : PagenationHelper.OFFSET,
  totalPageNumber: 0,
  searchQuery: route.query.search ? String(route.query.search) : PagenationHelper.SEARCH_QUERY,
  sortField: route.query.sortField ? String(route.query.sortField) : 'createdAt',
  sortOrder: route.query.sortOrder ? String(route.query.sortOrder) : PagenationHelper.SORT_ORDER,
  startDate: route.query.startDate ? String(route.query.sortOrder) : '',
  endDate: route.query.startDate ? String(route.query.sortOrder) : '',
  data: []
})

const queries = reactive<QueryModel>({
  page: pagenation.currentPageNumber,
  limit: pagenation.offset,
  sortField: pagenation.sortField,
  sortOrder: pagenation.sortOrder,
  startDate: pagenation.startDate,
  endDate: pagenation.endDate
})

let order = reactive<OrderModel>({
  _id: '',
  customer: '',
  totalAmount: 0,
  status: 0,
  address1: '',
  address2: '',
  createdAt: new Date(),
  orderDetails: []
})

let message = ref<string>('')

let status = ref<number>(OrderStatusHelper.WAITE)

let selectedOrderAcction = ref<string>('')

const fetchData = async () => {
  const orderStatus = String(route.params.orderStatus)
  if (orderStatus == 'waite') {
    status.value = OrderStatusHelper.WAITE
  } else if (orderStatus == 'shiping') {
    status.value = OrderStatusHelper.SHIP
  } else if (orderStatus == 'finish') {
    status.value = OrderStatusHelper.FINISH
  } else if (orderStatus == 'accept') {
    status.value = OrderStatusHelper.ACCEPT
  } else {
    status.value = OrderStatusHelper.CENCEL
  }
  let s = status.value
  try {
    const result: APIResponseModel<PagenationResponseModel<OrderModel[]>> = await stores.dispatch(
      'order/getOrderList',
      {
        status: s,
        paginationInfor: queries
      }
    )
    pagenation.data = result.data?.content || []
    pagenation.totalPageNumber = result.data?.totalPages || 0
    pagenation.currentPageNumber = result.data?.page || pagenation.currentPageNumber
  } catch (error) {
    console.log(error)
  }
}

const selectedPage = (page: number) => {
  pagenation.currentPageNumber = page
}

const searched = async (value: { startDate: string; endDate: string }) => {
  pagenation.endDate = value.endDate
  pagenation.startDate = value.startDate
  queries.endDate = pagenation.endDate
  queries.startDate = pagenation.startDate
  await fetchData()
}

const showModal = (value: OrderModel, action: string) => {
  order = value
  if (action == 'showDetail') {
    modal.open('Thông tin đơn hàng', false, undefined, 'orderDetail')
  } else if (action == 'showEmployeList') {
    modal.open('Danh sách nhân viên', false, undefined, 'employeeList')
  } else if (action == 'cancelOrder') {
    selectedOrderAcction.value = action
    modal.open('Thông báo', true, undefined, 'message')
    message.value = 'Chắc chắn bạn muốn huỷ đơn này'
  } else if (action == 'acceptOrder') {
    selectedOrderAcction.value = action
    modal.open('Thông báo', true, undefined, 'message')
    message.value = 'Chắc chắn bạn muốn nhận đơn này'
  }
}

const formatDate = (value: Date): string => {
  return format(new Date(value), 'dd/MM/yyyy')
}

const selectedAcction = async (action: boolean) => {
  modal.close()
  if (action) {
    if (
      selectedOrderAcction.value == 'cancelOrder' ){
      await editlOrder(OrderStatusHelper.CENCEL)
    } else if(selectedOrderAcction.value == 'acceptOrder'){
      await editlOrder(OrderStatusHelper.ACCEPT)
      
    }
    await fetchData()
  }
}

const editlOrder = async (status:number) => {
  modal.close()
  try {
    const result: APIResponseModel<OrderModel> = await stores.dispatch('order/editlOrder', {
      status: status,
      orderId: order._id
    })
    message.value = result.message
  } catch (error: any) {
    message.value = error.message
  }
  modal.open('Thông báo', false, undefined, 'message')
}

const selectedEmployee = async (employeeId: string) => {
  modal.close()
  let assignment: AssignmentModel = {
    order: order._id,
    employee: employeeId
  }

  try {
    const result: APIResponseModel<AssignmentModel> = await stores.dispatch(
      'assignment/assignedOrderToEmployee',
      assignment
    )
    message.value = result.message
    await fetchData()
  } catch (error: any) {
    message.value = error.message
  }
  modal.open('Thông báo', false, undefined, 'message')
}

watch(
  () => route.params.orderStatus,
  async (newStatus, oldStatus) => {
    if (newStatus !== oldStatus) {
      await fetchData()
    }
  }
)

watch(
  () => pagenation.currentPageNumber,
  async (newPage, oldPage) => {
    if (newPage !== oldPage) {
      queries.page = pagenation.currentPageNumber
      await fetchData()
    }
  }
)

const getCustomerInfor = (value: UserModel): UserModel => {
  return value
}

onMounted(async () => {
  await fetchData()
})
</script>
<template>
  <div class="content-main">
    <div class="content-main-header" style="font-size: 1em">
      <DateSearchtingForm
        :start-date="pagenation.startDate!"
        :end-date="pagenation.endDate!"
        @searched="searched"
      ></DateSearchtingForm>
    </div>
    <div class="content-main-list">
      <div class="container-list">
        <div class="container-heading-list row">
          <div class="l-2">Mã đơn hàng</div>
          <div class="l-5">Địa chỉ</div>
          <div class="l-2">Khách hàng</div>
          <div class="l-1">Tổng tiền</div>
          <div class="l-1">Ngày đặt</div>
          <div class="l-1">Thao tác</div>
        </div>
        <div class="container-content-list" v-for="order in pagenation.data">
          <div class="container-content-item">
            <div class="l-2">{{ order._id }}</div>
            <div class="l-5">{{ order.address1 + ' ' + order.address2 }}</div>
            <div class="l-2">{{ getCustomerInfor(order.customer as UserModel).fullName }}</div>
            <div class="l-1">{{ order.totalAmount }}</div>
            <div class="l-1">{{ formatDate(order.createdAt) }}</div>
            <div class="l-1">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-4">
                  <button
                    class="btn-operation btn-infor"
                    title="Thông tin đơn hàng"
                    @click="showModal(order, 'showDetail')"
                  >
                    <font-awesome-icon :icon="['fas', 'info']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4" v-if="status == OrderStatusHelper.WAITE">
                  <button
                    class="btn-operation btn-infor"
                    title="Nhận đơn hàng"
                    @click="showModal(order, 'acceptOrder')"
                  >
                    <font-awesome-icon :icon="['fas', 'check']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4" v-if="status == OrderStatusHelper.WAITE">
                  <button
                    class="btn-operation btn-infor"
                    title="Huỷ đơn"
                    @click="showModal(order, 'cancelOrder')"
                  >
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4" v-if="status == OrderStatusHelper.ACCEPT">
                  <button
                    class="btn-operation btn-infor"
                    title="Phân công"
                    @click="showModal(order, 'showEmployeList')"
                  >
                    <font-awesome-icon :icon="['fas', 'rectangle-list']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4" v-if="status == OrderStatusHelper.SHIP">
                  <button
                    class="btn-operation btn-infor"
                    title="Nhân viên giao hàng"
                    @click="showModal(order, 'showEmploye')"
                  >
                    <font-awesome-icon :icon="['fas', 'truck']" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagenation v-bind="pagenation" @selected-page="selectedPage"></Pagenation>
  </div>
  <Modal v-bind="modal.data" @selected-acction="selectedAcction">
    <template #content v-if="modal.data.type == 'message'">{{ message }}</template>
    <template #content v-if="modal.data.type == 'orderDetail'">
      <OrderDetail :order="order"></OrderDetail>
    </template>
    <template #content v-if="modal.data.type == 'employeeList'">
      <AssignJobs @selected-employee="selectedEmployee"></AssignJobs>
    </template>
  </Modal>
</template>
