<script setup lang="ts">
import type PagenationModel from '@/models/PagenationModel'
import { onMounted, reactive, ref, watch } from 'vue'
import Pagenation from '../../components/Pagenation.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'
import { useRoute } from 'vue-router'
import PriceFormView from '../../components/admin/PriceForm.vue'
import type QueryModel from '@/models/QueryModel'
import PagenationHelper from '@/helpers/PagenationHelper'
import PriceModel from '@/models/PriceModel'
import APIResponseModel from '@/models/ApiResponseModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import stores from '@/stores/Store'
import { format } from 'date-fns'
import CodeHelper from '@/helpers/CodeHelper'
import { useModal } from '@/composables/ModalComposable'
import Modal from '../common/Modal.vue'
import DateSearchtingForm from '@/components/DateSearchtingForm.vue'

const route = useRoute()
const modal = useModal()

const productId = String(route.params.productId)

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách sản phẩm', path: '/admin/product' },
  { title: 'Danh sách giá', path: '' }
]

const pagenation = reactive<PagenationModel<PriceModel[]>>({
  currentPageNumber: route.query.page
    ? Number(route.query.page)
    : PagenationHelper.CURRENT_PAGE_NUMBER,
  offset: route.query.limit ? Number(route.query.limit) : PagenationHelper.OFFSET,
  totalPageNumber: 0,
  searchQuery: route.query.search ? String(route.query.search) : PagenationHelper.SEARCH_QUERY,
  sortField: route.query.sortField ? String(route.query.sortField) : 'appliedAt',
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

let price = reactive<PriceModel>(new PriceModel())

const message = ref<string>('')

const fetchData = async () => {
  try {
    const result: APIResponseModel<PagenationResponseModel<PriceModel[]>> = await stores.dispatch(
      'product/getPriceList',
      {
        productId: productId,
        pagenationInfor: queries
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

const formatDate = (value: Date): string => {
  return format(new Date(value), 'dd/MM/yyyy')
}

const showModal = (value: PriceModel) => {
  price = value
  modal.open('Thông báo', true, undefined, 'message')
  message.value = 'Bạn chắc chắn muốn xoá giá này!'
}

const selectedAcction = async (action: boolean) => {
  modal.close()
  if (action) {
    try {
      const result: APIResponseModel<string> = await stores.dispatch('product/deletePrice', {
        productId: productId,
        priceId: price._id
      })
      modal.open('Thông báo', false, undefined, 'message')
      message.value = result.message
      await fetchData()
    } catch (error: any) {
      modal.open('Thông báo', false, undefined, 'message')
      message.value = error.message
    }
  }
}

const created = async (newPrice: PriceModel) => {
  newPrice.productId = productId
  try {
    let result: APIResponseModel<PriceModel> = await stores.dispatch(
      'product/createPrice',
      newPrice
    )

    if (result.code == CodeHelper.SUCCESS && result.data) {
      message.value = result.message
      modal.open('Thông báo', false, undefined, 'message')
      if (pagenation.data.length == queries.limit) {
        pagenation.data.unshift(result.data!)
        pagenation.data.pop()
      } else {
        pagenation.data.unshift(result.data!)
      }
    }
  } catch (error) {}
}

const searched = async (value: { startDate: string; endDate: string }) => {
  pagenation.endDate = value.endDate
  pagenation.startDate = value.startDate
  queries.endDate = pagenation.endDate
  queries.startDate = pagenation.startDate
  await fetchData()
}

watch(
  () => ({
    currentPageNumber: pagenation.currentPageNumber,
    searchQuery: pagenation.searchQuery
  }),
  async (newPagenation, oldPagenation) => {
    if (
      newPagenation.currentPageNumber !== oldPagenation.currentPageNumber ||
      newPagenation.searchQuery !== oldPagenation.searchQuery
    ) {
      queries.page = pagenation.currentPageNumber
      queries.search = pagenation.searchQuery
      await fetchData()
    }
  }
)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <Breadcrumb :navs="breadcrumb"></Breadcrumb>
  <div class="content-heading mb-10">
    <h2>Danh sách giá</h2>
  </div>
  <div class="row-offset-4">
    <div class="col-offset-4 l-9">
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
              <div class="l-3">Mã số</div>
              <div class="l-3">Giá (VND)</div>
              <div class="l-2">Ngày tạo</div>
              <div class="l-2">Ngày áp dụng</div>
              <div class="l-2">Thao tác</div>
            </div>
            <div class="container-content-list">
              <div class="container-content-item" v-for="price in pagenation.data">
                <div class="l-3">{{ price._id }}</div>
                <div class="l-3">{{ price.newPrice }}</div>
                <div class="l-2">{{ formatDate(price.createdAt!) }}</div>
                <div class="l-2">{{ formatDate(price.appliedAt!) }}</div>
                <div class="l-2">
                  <div class="operation row-offset-4-wrap">
                    <div class="col-offset-4 l-3">
                      <button
                        class="btn-operation btn-remove"
                        title="Xoá giá này"
                        @click="showModal(price)"
                      >
                        <font-awesome-icon :icon="['fas', 'trash']" />
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
    </div>
    <div class="col-offset-4 l-3">
      <PriceFormView @created="created"></PriceFormView>
    </div>
  </div>
  <Modal v-bind="modal.data" @selected-acction="selectedAcction">
    <template #content v-if="modal.data.type == 'message'">
      <p>{{ message }}</p>
    </template>
  </Modal>
</template>
