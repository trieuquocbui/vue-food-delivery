<script setup lang="ts">
import type PagenationModel from '@/models/PagenationModel'
import { onMounted, reactive, ref, watch } from 'vue'
import Pagenation from '../../components/Pagenation.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'
import { useRoute, useRouter } from 'vue-router'
import type CategoryModel from '@/models/CategoryModel'
import PagenationHelper from '@/helpers/PagenationHelper'
import type QueryModel from '@/models/QueryModel'
import stores from '@/stores/Store'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type APIResponseModel from '@/models/ApiResponseModel'
import AppHelper from '@/helpers/AppHelper'
import { useModal } from '@/composables/ModalComposable'
import Modal from '../common/Modal.vue'

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách danh mục', path: '' }
]

const route = useRoute()
const router = useRouter()
const modal = useModal()

const pagenation = reactive<PagenationModel<CategoryModel[]>>({
  currentPageNumber: route.query.page
    ? Number(route.query.page)
    : PagenationHelper.CURRENT_PAGE_NUMBER,
  offset: route.query.limit ? Number(route.query.limit) : 3,
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

const message = ref<string>('')

let path = ref<string>(AppHelper.imagePath)

let category = reactive<CategoryModel>({
  id: '',
  name: '',
  thumbnail: '',
  status: false
})

const fetchData = async () => {
  try {
    const result: APIResponseModel<PagenationResponseModel<CategoryModel[]>> =
      await stores.dispatch('category/getCategoryList', queries)
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

const status = (value: boolean) => {
  return value ? 'Hiện thị' : 'Không hiện thị'
}

const selectedAcction = async (action: boolean) => {
  modal.close()
  if (action) {
    try {
      const result: APIResponseModel<string> = await stores.dispatch(
        'category/deleteCategory',
        category.id
      )
      modal.open('Thông báo', false, undefined, 'message')
      message.value = result.message
      pagenation.data = pagenation.data.filter((data) => data.id !== result.data)
    } catch (error: any) {
      modal.open('Thông báo', false, undefined, 'message')
      message.value = error.message
    }
  }
}

const showModal = (value: CategoryModel) => {
  category = value
  modal.open('Thông báo', true, undefined, 'message')
  message.value = 'Chắc chắn bạn muốn xoá danh mục này!'
}

const redirectPage = (categoryId: String) => {
  router.push(`/admin/category/${categoryId}/edit`)
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
    <h2>Danh sách danh mục</h2>
  </div>
  <div class="content-main">
    <div class="content-main-header">
      <div class="content-main-add">
        <h3 class="content-main-add-title">Thêm danh mục:</h3>
        <div class="operation">
          <button
            @click="$router.push('/admin/category/add')"
            class="ml-4 btn-operation btn-add"
            title="Thêm danh mục"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
        </div>
      </div>
      <form class="form" action="">
        <div class="form-group">
          <input
            class="form-group-input"
            v-model="pagenation.searchQuery"
            type="search"
            placeholder="Tìm kiếm..."
          />
        </div>
      </form>
    </div>
    <div class="content-main-list">
      <div class="container-list">
        <div class="container-heading-list row">
          <div class="l-2">Hình ảnh</div>
          <div class="l-3">Mã</div>
          <div class="l-3">Tên</div>
          <div class="l-2">Trạng thái</div>
          <div class="l-2">Thao tác</div>
        </div>
        <div class="container-content-list">
          <div class="container-content-item" v-for="category in pagenation.data">
            <div class="l-2">
              <img :src="path + category.thumbnail" alt="" class="image" />
            </div>
            <div class="l-3">{{ category.id }}</div>
            <div class="l-3">{{ category.name }}</div>
            <div class="l-2">{{ status(category.status) }}</div>
            <div class="l-2">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-2">
                  <button
                    class="btn-operation btn-update"
                    title="Cho nhân viên nghỉ"
                    @click="redirectPage(category.id)"
                  >
                    <font-awesome-icon :icon="['fas', 'pen']" />
                  </button>
                </div>
                <div class="col-offset-4 l-2">
                  <button
                    class="btn-operation btn-remove"
                    title="Cho nhân viên nghỉ"
                    @click="showModal(category)"
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
  </Modal>
</template>

<style scoped>
.image {
  height: 70px;
  width: 70px;
}
</style>
