<script setup lang="ts">
import Pagenation from '@/components/Pagenation.vue'
import Modal from '../../views/common/Modal.vue'
import type ModalModel from '@/models/ModalModel'
import type PagenationModel from '@/models/PagenationModel'
import { reactive } from 'vue'

let pagenation = reactive<PagenationModel>({
  currentPageNumber: 1,
  offset: 2,
  totalPageNumber: 10
})

let modal = reactive<ModalModel>({
  modelId: 'id',
  display: 'none'
})

const selectedPage = (page: number) => {
  pagenation.currentPageNumber = page
}

const selectedAcction = (acction: boolean) => {
  console.log(acction)
  modal.display = 'none'
}
</script>
<template>
  <div class="content-main">
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
          <div class="l-2">Mã đơn hàng</div>
          <div class="l-5">Địa chỉ</div>
          <div class="l-2">Tổng tiền</div>
          <div class="l-2">Ngày đặt</div>
          <div class="l-1">Thao tác</div>
        </div>
        <div class="container-content-list">
          <div class="container-content-item">
            <div class="l-2">667dbbb6bdfdbe26ff03facb</div>
            <div class="l-5">Hồ Chí Minh</div>
            <div class="l-2">12340</div>
            <div class="l-2">07/07/2024</div>
            <div class="l-1">
              <div class="operation row-offset-4-wrap">
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

  <Modal v-bind="modal" @selected-acction="selectedAcction"></Modal>
</template>
