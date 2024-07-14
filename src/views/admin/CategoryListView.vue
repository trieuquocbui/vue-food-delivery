<script setup lang="ts">
import type PagenationModel from '@/models/PagenationModel'
import { reactive, ref } from 'vue'
import Pagenation from '../../components/Pagenation.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'
import { useRoute } from 'vue-router'
import type CategoryModel from '@/models/CategoryModel'
import PagenationHelper from '@/helpers/PagenationHelper'
import type QueryModel from '@/models/QueryModel'
import stores from '@/stores/Store'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type APIResponseModel from '@/models/ApiResponseModel'

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách danh mục', path: '' }
]

const route = useRoute()

const pagenation = reactive<PagenationModel<CategoryModel[]>>({
  currentPageNumber: route.query.page
    ? Number(route.query.page)
    : PagenationHelper.CURRENT_PAGE_NUMBER,
  offset: route.query.limit ? Number(route.query.limit) : PagenationHelper.OFFSET,
  totalPageNumber: 0,
  searchQuery: route.query.search ? String(route.query.search) : PagenationHelper.SEARCH_QUERY,
  sortField: route.query.sortBy ? String(route.query.sortBy) : PagenationHelper.SORT_FIELD,
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

let category = reactive<CategoryModel>({
  id: '',
  name: '',
  thumbnail: '',
  status: false
})

const fetchData = async () => {
  try {
    const result: APIResponseModel<PagenationResponseModel<CategoryModel[]>> =
      await stores.dispatch('account/getAccountList', {
        pagenationInfor: queries,
        roleId: 'EM'
      })
    pagenation.data = result.data?.content || []
    pagenation.totalPageNumber = result.data?.totalPages || 0
    pagenation.currentPageNumber = result.data?.page || pagenation.currentPageNumber
  } catch (error) {
    console.log(error)
  }
}

const message = ref<string>('')

const selectedPage = (page: number) => {
  pagenation.currentPageNumber = page
}
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
          <input class="form-group-input" type="search" placeholder="Tìm kiếm..." />
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
          <div class="container-content-item">
            <div class="l-2">
              <img src="../../assets/images/th.jpg" alt="" class="image" />
            </div>
            <div class="l-3">CT</div>
            <div class="l-3">Cơm tấm</div>
            <div class="l-2">Đang kinh doanh</div>
            <div class="l-2">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-4">
                  <button class="btn-operation btn-update" title="Cho nhân viên nghỉ">
                    <font-awesome-icon :icon="['fas', 'pen']" />
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
</template>

<style scoped>
.image {
  height: 70px;
  width: 70px;
}
</style>
