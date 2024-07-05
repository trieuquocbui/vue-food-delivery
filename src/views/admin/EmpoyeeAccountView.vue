<script setup lang="ts">
import Pagenation from '@/components/Pagenation.vue'
import Modal from '../../views/common/Modal.vue'
import type ModalModel from '@/models/Modal'
import type PagenationModel from '@/models/Pagenation'
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
      <div class="content-main-add">
        <h3 class="content-main-add-title">Thêm nhân viên:</h3>
        <div class="operation">
          <button
            @click="$router.push('/admin/account/employee/add')"
            class="ml-4 btn-operation btn-add"
            title="Thêm tài khoản"
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
          <div class="l-2">Tên tài khoản</div>
          <div class="l-2">Họ và tên</div>
          <div class="l-2">Số điện thoại</div>
          <div class="l-5">Địa chỉ</div>
          <div class="l-1">Thao tác</div>
        </div>
        <div class="container-content-list">
          <div class="container-content-item">
            <div class="l-2">Admin</div>
            <div class="l-2">Bùi Quốc Triệu</div>
            <div class="l-2">0869070142</div>
            <div class="l-5">Hồ chí Minh</div>
            <div class="l-1">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-4">
                  <button class="btn-operation btn-infor" title="Thông tin">
                    <font-awesome-icon :icon="['fas', 'info']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4">
                  <button class="btn-operation btn-update" title="Chỉnh sữa">
                    <font-awesome-icon :icon="['fas', 'pen']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4">
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

  <Modal v-bind="modal" @selected-acction="selectedAcction"></Modal>
</template>
