<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import type AccountModel from '@/models/AccountInforModel'
import { format } from 'date-fns'
import { ref, watch } from 'vue'

const props = defineProps<{ account: AccountModel }>()

const image = ref<string>(AppHelper.imageDefalut)

const formatDate = (value: Date): string => {
  if (value) {
    return format(new Date(value), 'dd/MM/yyyy')
  }
  return ''
}

const gender = (value: number): string => {
  return value ? 'Nữ' : 'Nam'
}

watch(
  () => props.account,
  (newAccount) => {
    if (newAccount.thumbnail) {
      image.value = AppHelper.imagePath + props.account.thumbnail
    }
  },
  { immediate: true }
)
</script>
<template>
  <div class="row" style="width: 800px">
    <div class="l-4">
      <img style="width: 200px; height: 200px" :src="image" alt="Tên sản phẩm" />
    </div>
    <div class="l-8 row">
      <div class="l-12 row align-items-center">
        <p><label>Họ và tên: </label>{{ props.account.user.fullName }}</p>
      </div>
      <div class="l-12 row align-items-center">
        <p><label>Di động: </label>{{ props.account.user.phoneNumber }}</p>
      </div>
      <div class="l-12 row align-items-center">
        <p><label>Ngày sinh: </label>{{ formatDate(props.account.user.dob!) }}</p>
      </div>
      <div class="l-12 row align-items-center">
        <p><label>Giới tính: </label>{{ gender(props.account.user.gender!) }}</p>
      </div>
      <div class="l-12 row align-items-center">
        <p><label>Địa chỉ: </label>{{ props.account.user.address }}</p>
      </div>
    </div>
  </div>
</template>
