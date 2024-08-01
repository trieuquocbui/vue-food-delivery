<script setup lang="ts">
import HeaderView from '../../components/admin/Header.vue'
import NavView from '../../components/admin/Nav.vue'
import FooterView from '../../components/admin/Footer.vue'
import type NavModel from '@/models/NavModel'

import { useToast } from 'vue-toast-notification'
import { io } from 'socket.io-client'
import { socket } from '@/socket'

const toast = useToast()

let viewMav: NavModel[] = [
  { title: 'Quản lí tài khoản', path: '/admin/account' },
  { title: 'Quản lí danh mục', path: '/admin/category' },
  { title: 'Quản lí sản phẩm', path: '/admin/product' },
  { title: 'Quản lí đơn hàng', path: '/admin/order' }
]

socket.on('registerNotificationToAdmin', (data: string) => {
  toast.open({ message: data, position: 'bottom-right', dismissible: true, duration: 0 })
})

socket.on('order-unassigned', (data: string) => {
  toast.open({ message: data, position: 'bottom-right', dismissible: true, duration: 0 })
})

socket.on('order-assigned', (data: string) => {
  toast.open({ message: data, position: 'bottom-right', dismissible: true, duration: 0 })
})
</script>
<template>
  <div class="main">
    <div class="container">
      <div class="l-2">
        <NavView :navs="viewMav"></NavView>
      </div>
      <div class="l-10">
        <HeaderView></HeaderView>
        <RouterView />
        <FooterView></FooterView>
      </div>
    </div>
  </div>
</template>

<style>
@import url('../../assets/css/admin.css');
</style>
