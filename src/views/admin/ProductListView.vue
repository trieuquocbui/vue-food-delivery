<script setup lang="ts">
import type PagenationModel from '@/models/Pagenation'
import { reactive } from 'vue'
import Pagenation from '../../components/Pagenation.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách sản phẩm', path: '' }
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
          <input class="form-group-input" type="search" placeholder="Tìm kiếm..." />
        </div>
      </form>
    </div>
    <div class="content-main-list">
      <div class="container-list">
        <div class="container-heading-list row">
          <div class="l-1">Hình ảnh</div>
          <div class="l-1">Mã</div>
          <div class="l-3">Tên</div>
          <div class="l-1">Giá</div>
          <div class="l-1">Số lượng</div>
          <div class="l-1">Đã bán</div>
          <div class="l-1">Trạng thái</div>
          <div class="l-1">Nổi bật</div>
          <div class="l-2">Thao tác</div>
        </div>
        <div class="container-content-list">
          <div class="container-content-item">
            <div class="l-1">
              <img src="../../assets/images/th.jpg" alt="" class="image" />
            </div>
            <div class="l-1">ABCD</div>
            <div class="l-3">Cơm tấm sườn bì chả</div>
            <div class="l-1">50.000</div>
            <div class="l-1">1000</div>
            <div class="l-1">500</div>
            <div class="l-1">Kinh doanh</div>
            <div class="l-1">Nổi bật</div>
            <div class="l-2">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-3">
                  <button class="btn-operation btn-infor" title="Thông tin">
                    <font-awesome-icon :icon="['fas', 'info']" />
                  </button>
                </div>
                <div class="col-offset-4 l-3">
                  <routerLink
                    :to="'/admin/product/id/price'"
                    class="btn-operation btn-add"
                    title="Danh sách giá"
                  >
                    <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
                  </routerLink>
                </div>
                <div class="col-offset-4 l-3">
                  <button class="btn-operation btn-update" title="Cho nhân viên nghỉ">
                    <font-awesome-icon :icon="['fas', 'pen']" />
                  </button>
                </div>
                <div class="col-offset-4 l-3">
                  <button class="btn-operation btn-remove" title="Cho nhân viên nghỉ">
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
</template>

<style scoped>
.image {
  height: 70px;
  width: 70px;
}
</style>
