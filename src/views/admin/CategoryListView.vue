<script setup lang="ts">
import type PagenationModel from '@/models/Pagenation'
import { reactive } from 'vue'
import Pagenation from '../../components/Pagenation.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách danh mục', path: '' }
]

let pagenation = reactive<PagenationModel>({
  currentPageNumber: 1,
  offset: 2,
  totalPageNumber: 10
})

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
