<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import type ProductModel from '@/models/ProductModel'
import { format } from 'date-fns'
import { ref, watch } from 'vue'

const props = defineProps<{ product: ProductModel }>()

const image = ref<string>(AppHelper.imagePath + props.product.thumbnail)

const formatDate = (value: Date): string => {
  if (value) {
    return format(new Date(value), 'dd/MM/yyyy')
  }
  return ''
}

const status = (value: boolean) => {
  return value ? 'Đang kinh doanh' : 'Ngừng kinh doanh'
}

const feature = (value: boolean) => {
  return value ? 'Đúng' : 'không'
}

// watch(
//   () => props.product,
//   (newProduct) => {
//     if (newProduct.thumbnail) {
//       image.value = AppHelper.imagePath + props.product.thumbnail
//     }
//   },
//   { immediate: true }
// )
</script>

<template>
  <div class="row row-offset-8" style="width: 1000px">
    <div class="l-3 col-offset-8">
      <img style="width: 200px; height: 200px" :src="image" alt="Tên sản phẩm" />
    </div>
    <div class="l-9 col-offset-8 row">
      <div class="l-12 row align-items-center">
        <div class="row l-12">
          <div class="l-6 row">
            <p><label>Mã số: </label>{{ props.product._id }}</p>
          </div>
          <div class="l-6 row">
            <p><label>Tên món: </label>{{ props.product.name }}</p>
          </div>
        </div>
      </div>
      <div class="l-12 row align-items-center">
        <div class="row l-12">
          <div class="l-6 row">
            <p><label>Giá (VND): </label>{{ props.product.price }}</p>
          </div>
          <div class="l-6 row">
            <p><label>Ngày áp dụng giá: </label>{{ formatDate(props.product.appliedAt!) }}</p>
          </div>
        </div>
      </div>
      <div class="l-12 row align-items-center">
        <div class="row l-12">
          <div class="l-6 row">
            <p><label>Số lượng (Phần): </label>{{ props.product.quantity }}</p>
          </div>
          <div class="l-6 row">
            <p><label>Đã bán (Phần): </label>{{ props.product.sold }}</p>
          </div>
        </div>
      </div>
      <div class="l-12 row align-items-center">
        <div class="l-6 row">
          <p><label>Trạng thái: </label>{{ status(product.status) }}</p>
        </div>
        <div class="l-6 row">
          <p><label>Sản phẩm nổi bật: </label>{{ feature(product.featured) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
