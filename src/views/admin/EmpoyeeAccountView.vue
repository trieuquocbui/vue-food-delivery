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
          <div class="l-3">Mã bài báo</div>
          <div class="l-4-o-5">Tên bài báo</div>
          <div class="l-1-o-5">Nguồn báo</div>
          <div class="l-1-o-5">Chủ đề</div>
          <div class="l-1-o-5">Thao tác</div>
        </div>
        <div class="container-content-list">
          <div class="container-content-item">
            <div class="l-3">asd</div>
            <div class="l-4-o-5">asd</div>
            <div class="l-1-o-5">asd</div>
            <div class="l-1-o-5">asd</div>
            <div class="l-1-o-5">
              <div class="operation">
                <!-- <button [routerLink]="['information', item.id]" class="btn-operation btn-infor" title="Chi tiết bài báo" ><i class="fa-solid fa-circle-info"></i></button>
                <button [routerLink]="['edit', item.id]" class="btn-operation btn-update" title="Điều chỉnh nguồn báo" ><i class="fa-solid fa-pen"></i></button>
                <button class="btn-operation btn-remove" [appModal]="item.id!" [positionClose]="i" [widthSize]="'20%'" title="Xoá nguồn báo"><i class="fa-solid fa-trash"></i></button> -->
                <!-- <ng-template #notify> Bạn muốn xoá chủ đề này! </ng-template> -->
                <!-- <app-modal [modelId]="item.id!" [template]="notify" (checked)="checked($event,item)"></app-modal> -->
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
