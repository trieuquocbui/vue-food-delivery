<script setup lang="ts">
import type PagenationModel from '@/models/PagenationModel'
import { onMounted, reactive, ref, watch } from 'vue'
import Pagenation from '../../components/Pagenation.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'
import { useRoute, useRouter } from 'vue-router'
import { useModal } from '@/composables/ModalComposable'
import type ProductModel from '@/models/ProductModel'
import PagenationHelper from '@/helpers/PagenationHelper'
import type QueryModel from '@/models/QueryModel'
import AppHelper from '@/helpers/AppHelper'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type APIResponseModel from '@/models/ApiResponseModel'
import stores from '@/stores/Store'
import Modal from '../common/Modal.vue'
import { format } from 'date-fns'
import ProductDetail from '@/components/admin/ProductDetail.vue'

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách sản phẩm', path: '' }
]

const route = useRoute()
const router = useRouter()
const modal = useModal()

const pagenation = reactive<PagenationModel<ProductModel[]>>({
  currentPageNumber: route.query.page
    ? Number(route.query.page)
    : PagenationHelper.CURRENT_PAGE_NUMBER,
  offset: route.query.limit ? Number(route.query.limit) : PagenationHelper.OFFSET,
  totalPageNumber: 0,
  searchQuery: route.query.search ? String(route.query.search) : PagenationHelper.SEARCH_QUERY,
  sortField: route.query.sortField ? String(route.query.sortField) : PagenationHelper.SORT_FIELD,
  sortOrder: route.query.sortOrder ? String(route.query.sortOrder) : PagenationHelper.SORT_ORDER,
  data: []
})

const queries = reactive<QueryModel>({
  page: pagenation.currentPageNumber,
  limit: pagenation.offset,
  search: pagenation.searchQuery,
  sortField: pagenation.sortField,
  sortOrder: pagenation.sortOrder
})

let image = ref<string>(AppHelper.imagePath)

const message = ref<string>('')

let product = reactive<ProductModel>({
  _id: '',
  name: '',
  description: '',
  quantity: 0,
  status: false,
  featured: false,
  price: 0,
  category: '',
  thumbnail: ''
})

const fetchData = async () => {
  try {
    const result: APIResponseModel<PagenationResponseModel<ProductModel[]>> = await stores.dispatch(
      'product/getProductList',
      queries
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

const selectedAcction = async (action: boolean) => {
  modal.close()
  if (action) {
    try {
      const result: APIResponseModel<string> = await stores.dispatch(
        'product/deleteProduct',
        product._id
      )
      modal.open('Thông báo', false, undefined, 'message')
      message.value = result.message
      pagenation.data = pagenation.data.filter((data) => data._id !== result.data)
    } catch (error: any) {
      modal.open('Thông báo', false, undefined, 'message')
      message.value = error.message
    }
  }
}

const showModal = (value: ProductModel, action: string) => {
  product = value
  if (action == 'get') {
    modal.open('Thông tin sản phẩm', false, undefined, 'data')
  } else {
    modal.open('Thông báo', true, undefined, 'message')
    message.value = 'Bạn chắc chắn muốn xoá sản phẩm này!'
  }
}

const redirectPage = (url: string) => {
  router.push(url)
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
    <h2>Danh sách sản phẩm</h2>
  </div>
  <div class="content-main">
    <div class="content-main-header">
      <div class="content-main-add">
        <h3 class="content-main-add-title">Thêm sản phẩm:</h3>
        <div class="operation">
          <button
            @click="$router.push('/admin/product/add')"
            class="ml-4 btn-operation btn-add"
            title="Thêm sản phẩm"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
        </div>
      </div>
      <form class="form" action="">
        <div class="form-group">
          <input
            class="form-group-input"
            type="search"
            v-model="pagenation.searchQuery"
            placeholder="Tìm kiếm..."
          />
        </div>
      </form>
    </div>
    <div class="content-main-list">
      <div class="container-list">
        <div class="container-heading-list row">
          <div class="l-1">Hình ảnh</div>
          <div class="l-3">Mã số</div>
          <div class="l-3">Tên món</div>
          <div class="l-1">Giá (VND)</div>
          <div class="l-1">Số lượng</div>
          <div class="l-1">Đã bán</div>
          <div class="l-2">Thao tác</div>
        </div>
        <div class="container-content-list">
          <div class="container-content-item" v-for="product in pagenation.data">
            <div class="l-1">
              <img :src="image + product.thumbnail" alt="" class="image" />
            </div>
            <div class="l-3">{{ product._id }}</div>
            <div class="l-3">{{ product.name }}</div>
            <div class="l-1">{{ product.price }}</div>
            <div class="l-1">{{ product.quantity }}</div>
            <div class="l-1">{{ product.sold }}</div>
            <div class="l-2">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-3">
                  <button
                    class="btn-operation btn-infor"
                    title="Thông tin"
                    @click="showModal(product, 'get')"
                  >
                    <font-awesome-icon :icon="['fas', 'info']" />
                  </button>
                </div>
                <div class="col-offset-4 l-3">
                  <button
                    class="btn-operation btn-add"
                    title="Danh sách giá"
                    @click="redirectPage(`/admin/product/${product._id}/price/list`)"
                  >
                    <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
                  </button>
                </div>
                <div class="col-offset-4 l-3">
                  <button
                    class="btn-operation btn-update"
                    title="Chỉnh sửa sản phẩm"
                    @click="redirectPage(`/admin/product/${product._id}/edit`)"
                  >
                    <font-awesome-icon :icon="['fas', 'pen']" />
                  </button>
                </div>
                <div class="col-offset-4 l-3">
                  <button
                    class="btn-operation btn-remove"
                    title="Xoá sản phẩm"
                    @click="showModal(product, 'remove')"
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
  <Modal v-bind="modal.data" @selected-acction="selectedAcction">
    <template #content v-if="modal.data.type == 'message'">
      <p>{{ message }}</p>
    </template>
    <template #content v-if="modal.data.type == 'data'">
      <ProductDetail :product="product"></ProductDetail>
    </template>
  </Modal>
</template>

<style scoped>
.image {
  height: 70px;
  width: 70px;
}
</style>
