<script setup lang="ts">
import type NavModel from '@/models/NavModel'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import ContentNav from '@/components/admin/Content-Nav.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { socket } from '@/socket'

let breadcrumb: NavModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách tài khoản', path: '' }
]

let contentnav: NavModel[] = [
  { title: 'Nhân viên', path: '/admin/account/employee' },
  { title: 'Khách hàng', path: '/admin/account/user' }
]
</script>

<template>
  <div class="content">
    <Breadcrumb :navs="breadcrumb"></Breadcrumb>
    <div class="content-heading mb-10">
      <h2>Danh sách tài khoản</h2>
    </div>
    <ContentNav :navs="contentnav"></ContentNav>
    <RouterView></RouterView>
  </div>
</template>
<style></style>
