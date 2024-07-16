<script setup lang="ts">
import PriceModel from '@/models/PriceModel'
import ValidatedPriceModel from '@/models/ValidatedPriceModel'
import { reactive } from 'vue'

const emit = defineEmits(['created'])

const price = reactive<PriceModel>(new PriceModel())

const errors = reactive<ValidatedPriceModel>(new ValidatedPriceModel())

const validate = () => {
  errors.newPrice = price.newPrice ? '' : 'Trường này cần nhập'
  errors.appliedAt = price.appliedAt ? '' : 'Trường này cần nhập'
  return !errors.newPrice && !errors.appliedAt
}

const hideError = (field: string) => {
  if (field == 'newPrice' && errors.newPrice != '') {
    errors.newPrice = ''
  } else if (field == 'appliedAt' && errors.appliedAt != '') {
    errors.appliedAt = ''
  }
}

const submit = async () => {
  if (validate()) {
    emit('created', price)
  }
}
</script>
<template>
  <div class="content-main">
    <form action="" class="form row" @submit.prevent="submit">
      <div class="form-group col-offset-4 l-12">
        <h2 class="form-group-title">Mẫu nhập thông tin giá mới</h2>
      </div>
      <div class="form-group col-offset-4 l-12">
        <div class="form-group">
          <label class="form-group-label" for="username"> Giá mới</label>
          <input
            v-model="price.newPrice"
            :class="{ 'input-error': errors.newPrice }"
            @focus="hideError('newPrice')"
            id="username"
            class="form-group-input"
            type="number"
            placeholder="Nhập tên giá"
          />
          <span class="form-group-error">
            <span>{{ errors.newPrice }} </span>
          </span>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="username"> Ngày áp dụng</label>
          <input
            :class="{ 'input-error': errors.appliedAt }"
            @focus="hideError('appliedAt')"
            v-model="price.appliedAt"
            class="form-group-input"
            type="date"
          />
          <span class="form-group-error">
            <span>{{ errors.appliedAt }}</span>
          </span>
        </div>
      </div>
      <div class="form-group col-offset-4 l-12">
        <button class="form-group-btn" type="submit">Đồng ý</button>
      </div>
    </form>
  </div>
</template>

<style>
.form {
  background-color: var(--white-background-color);
  border-radius: 4px;
  padding: 10px 10px;
}
</style>
