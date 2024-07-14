<script setup lang="ts">
import type PagenationModel from '@/models/PagenationModel'
import { reactive } from 'vue'
import Pagenation from '../../components/Pagenation.vue'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'
import { useRoute } from 'vue-router'
import PriceFormView from '../../views/admin/PriceFormView.vue'

const route = useRoute()

const productId = route.params.id

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách sản phẩm', path: '/admin/product' },
  { title: 'Danh sách giá', path: '' }
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
    <h2>Danh sách giá</h2>
  </div>
  <div class="row">
    <div class="content-main l-9">
      <div class="content-main-header">
        <form class="form" action="">
          <div class="form-group">
            <input class="form-group-input" type="search" placeholder="Tìm kiếm..." />
          </div>
        </form>
      </div>
      <div class="content-main-list">
        <div class="container-list">
          <div class="container-heading-list row">
            <div class="l-3">Mã số</div>
            <div class="l-3">Giá</div>
            <div class="l-2">Ngày tạo</div>
            <div class="l-2">Ngày áp dụng</div>
            <div class="l-2">Thao tác</div>
          </div>
          <div class="container-content-list">
            <div class="container-content-item">
              <div class="l-3">667d85221d389b1107af6c43</div>
              <div class="l-3">50.000</div>
              <div class="l-2">7/7/2024</div>
              <div class="l-2">19/7/2024</div>
              <div class="l-2">
                <div class="operation row-offset-4-wrap">
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
    <PriceFormView class="l-3"></PriceFormView>
  </div>
</template>
