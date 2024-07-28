<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import type { UserModel } from '@/models/AccountInforModel'
import type OrderModel from '@/models/OrderModel'
import type ProductModel from '@/models/ProductModel'
import { format } from 'date-fns'
import { ref, watch } from 'vue'

const props = defineProps<{ order: OrderModel }>()

const imagePath = AppHelper.imagePath

const productModel = (value: ProductModel): ProductModel => {
  return value
}

const showScrollBar = ref<boolean>(false)

const inforModel = (value: UserModel): UserModel => {
  return value
}

const formatDatetime = (value: Date): string => {
  return format(new Date(value), 'dd/MM/yyyy HH:mm:ss')
}

const totalMoney = (quantity: number, price: number): number => {
  let value: number = quantity * price
  return value
}

watch(
  () => props.order,
  (newOrder) => {
    showScrollBar.value = props.order.orderDetails.length > 6
  }
)
</script>

<template>
  <div class="model-order-details row">
    <div class="l-12 row">
      <div class="l-6 row">
        <p><label>Mã đơn hàng: </label>{{ props.order._id }}</p>
      </div>
      <div class="l-6 row">
        <p>
          <label>Người đặt hàng: </label
          >{{ inforModel(props.order.customer as UserModel).fullName }}
        </p>
      </div>
    </div>
    <div class="l-12 row mt-6">
      <div class="l-6 row">
        <p><label>Thời gian: </label>{{ formatDatetime(props.order.createdAt) }}</p>
      </div>
      <div class="l-6 row">
        <p>
          <label>Số điện thoại: </label
          >{{ inforModel(props.order.customer as UserModel).phoneNumber }}
        </p>
      </div>
    </div>
    <div class="l-12 row mt-6">
      <p><label>Địa chỉ: </label>{{ props.order.address }}</p>
    </div>
    <div class="l-12 row mt-6">
      <div class="order-details l-12">
        <div class="order-details-heading row">
          <div class="l-1">Hình ảnh</div>
          <div class="l-3">Mã số</div>
          <div class="l-3">Tên món</div>
          <div class="l-2">Giá (VND)</div>
          <div class="l-1">Số lượng</div>
          <div class="l-2">Tổng tiền</div>
        </div>
        <div
          class="order-details-list mt-6"
          v-for="orderDetail in props.order.orderDetails"
          :class="{ scrollBar: showScrollBar }"
        >
          <div class="order-detailst-item">
            <div class="l-1">
              <img
                :src="imagePath + productModel(orderDetail.product as ProductModel).thumbnail"
                style="height: 54px; width: 84px"
                alt=""
                class="image"
              />
            </div>
            <div class="l-3">{{ productModel(orderDetail.product as ProductModel)._id }}</div>
            <div class="l-3">{{ productModel(orderDetail.product as ProductModel).name }}</div>
            <div class="l-2">{{ orderDetail.price }}</div>
            <div class="l-1">{{ orderDetail.quantity }}</div>
            <div class="l-2">{{ totalMoney(orderDetail.quantity, orderDetail.price) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="l-12 row mt-6">
      <p class="l-10" style="text-align: end">Thành tiền:</p>
      <p class="l-2 order-total">{{ props.order.totalAmount }}</p>
    </div>
  </div>
</template>

<style scoped>
.model-order-details {
  width: 1000px;
}
.scrollBar {
  height: calc(6 * 58px);
  overflow-y: auto;
}

.order-details-list::-webkit-scrollbar {
  width: 4px;
}

.order-details-list::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.order-details-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.order-detailst-item {
  height: 58px;
  display: flex;
  align-items: center;
  padding: 4px 0px;
  background-color: var(--white-background-color);
  border-bottom: 1px solid var(--border-color);
}
.order-detailst-item:nth-of-type(even) {
  background-color: var(--white-color);
}

.order-total {
  font-weight: 900;
}
</style>
