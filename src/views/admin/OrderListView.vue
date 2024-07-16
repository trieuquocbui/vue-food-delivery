<script setup lang="ts">
import Pagenation from '@/components/Pagenation.vue'
import type PagenationModel from '@/models/PagenationModel'
import { onMounted, reactive, watch } from 'vue'
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
import { InforModel } from '@/models/AccountInforModel'

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
  customerId: '',
  totalAmount: 0,
  status: 0,
  address: '',
  createdAt: new Date(),
  orderDetails: []
})

const fetchData = async () => {
  let status: number
  const orderStatus = String(route.params.orderStatus)
  if (orderStatus == 'waite') {
    status = OrderStatusHelper.Waite
  } else if (orderStatus == 'shiping') {
    status = OrderStatusHelper.SHIP
  } else if (orderStatus == 'finish') {
    status = OrderStatusHelper.FINISH
  } else {
    status = OrderStatusHelper.CENCEL
  }
  try {
    const result: APIResponseModel<PagenationResponseModel<OrderModel[]>> = await stores.dispatch(
      'order/getOrderList',
      {
        status: status,
        paginationInfor: queries
      }
    )
    console.log(result.data?.content)
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
    modal.open('Thông tin đơn hàng', false, undefined, 'data')
  }
}

const formatDate = (value: Date): string => {
  return format(new Date(value), 'dd/MM/yyyy')
}

const selectedAcction = async (action: boolean) => {
  modal.close()
}

watch(
  () => route.params.orderStatus,
  async (newStatus, oldStatus) => {
    if (newStatus !== oldStatus) {
      await fetchData()
    }
  }
)

const getCustomerInfor = (value: InforModel): InforModel => {
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
            <div class="l-5">{{ order.address }}</div>
            <div class="l-2">{{ getCustomerInfor(order.customerId as InforModel).fullName }}</div>
            <div class="l-1">{{ order.totalAmount }}</div>
            <div class="l-1">{{ formatDate(order.createdAt) }}</div>
            <div class="l-1">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-4">
                  <button class="btn-operation btn-infor" title="Thông tin" @click="showModal(order, 'showDetail')">
                    <font-awesome-icon :icon="['fas', 'info']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4">
                  <button class="btn-operation btn-infor" title="Thông tin">
                    <font-awesome-icon :icon="['fas', 'rectangle-list']" />
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
    <!-- <template #content v-if="modal.data.type == 'data'">
      <div class="row row-offset-8" style="width: 1000px">
        <div class="l-9 col-offset-8 row">
          <div class="l-12 row align-items-center">
            <div class="row l-12">
              <div class="l-6 row">
                <label class="l-4">Mã đơn hàng:</label>
                <p class="l-8">{{ order.id }}</p>
              </div>
              <div class="l-6 row">
                <label class="l-4">Tên món:</label>
                <p class="l-8">{{ product.name }}</p>
              </div>
            </div>
          </div>
          <div class="l-12 row align-items-center">
            <div class="row l-12">
              <div class="l-6 row">
                <label class="l-4">Giá (VND):</label>
                <p class="l-8">{{ product.price }}</p>
              </div>
              <div class="l-6 row">
                <label class="l-4">Ngày áp dụng giá :</label>
                <p class="l-8">{{ formatDate(product.appliedAt!) }}</p>
              </div>
            </div>
          </div>
          <div class="l-12 row align-items-center">
            <div class="row l-12">
              <div class="l-6 row">
                <label class="l-4">Số lượng (Phần):</label>
                <p class="l-8">{{ product.quantity }}</p>
              </div>
              <div class="l-6 row">
                <label class="l-4">Đã bán (Phần):</label>
                <p class="l-8">{{ product.sold }}</p>
              </div>
            </div>
          </div>
          <div class="l-12 row align-items-center">
            <div class="l-6 row">
              <label class="l-4">Trạng thái :</label>
              <p class="l-8">{{ status(product.status) }}</p>
            </div>
            <div class="l-6 row">
              <label class="l-4">Sản phẩm nổi bật :</label>
              <p class="l-8">{{ feature(product.featured) }}</p>
            </div>
          </div>
        </div>
      </div>
    </template> -->
  </Modal>
</template>
