<script setup lang="ts">
import type NavModel from '@/models/NavModel'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import ContentNav from '@/components/admin/Content-Nav.vue'
import { RouterView } from 'vue-router'

let breadcrumb: NavModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách đơn đặt hàng', path: '' }
]

let contentnav: NavModel[] = [
  { title: 'Đang Chờ', path: '/admin/order/waite' },
  { title: 'Chấp nhận', path: '/admin/order/accept' },
  { title: 'Đang giao hàng', path: '/admin/order/shiping' },
  { title: 'Đã giao', path: '/admin/order/finish' },
  { title: 'Đã hủy', path: '/admin/order/cencal' }
]
</script>

<template>
  <div class="content">
    <Breadcrumb :navs="breadcrumb"></Breadcrumb>
    <div class="content-heading mb-10">
      <h2>Danh sách đơn đặt hàng</h2>
    </div>
    <ContentNav :navs="contentnav"></ContentNav>
    <RouterView></RouterView>
  </div>
</template>
<style></style>
