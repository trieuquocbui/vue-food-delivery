<script setup lang="ts">
import { reactive, watchEffect } from 'vue'

const props = defineProps<{ startDate: string; endDate: string }>()

const emit = defineEmits(['searched'])

const value = reactive<{ startDate: string; endDate: string }>({
  startDate: '',
  endDate: ''
})

const errors = reactive<{ startDate: string; endDate: string }>({
  startDate: '',
  endDate: ''
})

watchEffect(() => {
  Object.assign(value, props)
})

const validate = () => {
  errors.startDate = value.startDate ? '' : 'Trường này cần nhập'
  errors.endDate = value.endDate ? '' : 'Trường này cần nhập'
  return !errors.startDate && !errors.endDate
}

const hideError = (field: string) => {
  if (field == 'startDate' && errors.startDate != '') {
    errors.startDate = ''
  } else if (field == 'endDate' && errors.endDate != '') {
    errors.endDate = ''
  }
}

const submit = async () => {
  if (validate()) {
    emit('searched', value)
  }
}
</script>

<template>
  <form class="form row-offset-4 l-12" action="" @submit.prevent="submit">
    <div class="form-group col-offset-4 l-5">
      <label class="form-group-label" for="username">Từ ngày</label>
      <input
        :class="{ 'input-error': errors.startDate }"
        @focus="hideError('startDate')"
        v-model="value.startDate"
        class="form-group-input"
        type="date"
      />
      <span class="form-group-error">
        <span>{{ errors.startDate }}</span>
      </span>
    </div>
    <div class="form-group col-offset-4 l-5">
      <label class="form-group-label" for="username">Tới ngày</label>
      <input
        :class="{ 'input-error': errors.endDate }"
        @focus="hideError('endDate')"
        v-model="value.endDate"
        class="form-group-input"
        type="date"
      />
      <span class="form-group-error">
        <span>{{ errors.endDate }}</span>
      </span>
    </div>
    <div class="form-group col-offset-4 l-2">
      <label class="form-group-label" for="username" style="text-align: center">Nhấn nút</label>
      <div class="form-group col-offset-4 l-12">
        <button class="form-group-btn" type="submit">Tra cứu</button>
      </div>
    </div>
  </form>
</template>
