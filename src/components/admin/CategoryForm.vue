<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import type CategoryModel from '@/models/CategoryModel'
import type StatusModel from '@/models/StatusModel'
import ValidatedCategoryModel from '@/models/ValidatedCategoryModel'
import { reactive, ref, watch, watchEffect } from 'vue'

let status: StatusModel[] = [
  { id: true, name: 'Hiện thị' },
  { id: false, name: 'Không hiện thị' }
]

const props = defineProps<{ category: CategoryModel; errors: ValidatedCategoryModel }>()

const emit = defineEmits(['action'])

const action = ref<string>('create')

const imagePath = ref<string>(AppHelper.imageDefalut)

const file = ref<File>()

const image = ref<string>('')

let category = reactive<CategoryModel>({ ...props.category })

const errors = reactive<ValidatedCategoryModel>(new ValidatedCategoryModel())

watchEffect(() => {
  Object.assign(category, props.category)
  Object.assign(errors, props.errors)
})

watch(
  () => category.thumbnail,
  (newThumbnail: string | undefined) => {
    if (newThumbnail) {
      imagePath.value = AppHelper.imagePath + newThumbnail
      image.value = newThumbnail
      action.value = 'update'
    }
  }
)

const hideError = (field: string) => {
  if (field == 'id' && errors.id != '') {
    errors.id = ''
  } else if (field == 'name' && errors.name != '') {
    errors.name = ''
  } else if (field == 'thumbnail' && errors.thumbnail != '' && category.thumbnail != '') {
    errors.thumbnail = ''
  }
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    image.value = input.files[0].name
    file.value = input.files[0]
    imagePath.value = URL.createObjectURL(input.files[0])
  }
}

const validate = () => {
  errors.thumbnail = image.value ? '' : 'Trường này cần nhập'
  errors.id = category.id ? '' : 'Trường này cần nhập'
  errors.name = category.name ? '' : 'Trường này cần nhập'
  return !errors.thumbnail && !errors.thumbnail && !errors.name
}

const submit = async () => {
  if (validate()) {
    const formData = new FormData()
    formData.append('data', JSON.stringify(category))
    if (category.thumbnail) {
      if (file.value) {
        formData.append('image', file.value)
      }
      emit('action', 'update', formData)
    } else {
      formData.append('image', file.value!)
      emit('action', 'create', formData)
    }
  }
}
</script>
<template>
  <form action="" class="form row" @submit.prevent="submit">
    <div class="form-group col-offset-4 l-12">
      <h2 class="form-group-title">Mẫu nhập thông tin danh mục</h2>
    </div>
    <div class="col-offset-4 l-4">
      <div class="image-container">
        <img :src="imagePath" alt="" class="image" />
      </div>
      <div class="form-group">
        <input
          id="username"
          class="form-group-input"
          type="file"
          :class="{ 'input-error': errors.thumbnail }"
          @focus="hideError('thumbnail')"
          @change="handleFileChange"
        />
        <span class="form-group-error">
          <span>{{ errors.thumbnail }}</span>
        </span>
      </div>
    </div>
    <div class="col-offset-4 l-8">
      <div class="row l-12">
        <div class="form-group col-offset-4 l-12">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Mã danh
            mục</label
          >
          <input
            id="id"
            class="form-group-input"
            type="text"
            placeholder="Nhập mã danh mục"
            :class="{ 'input-error': errors.id }"
            @focus="hideError('id')"
            v-model="category.id"
            :disabled="action != 'create'"
          />
          <span class="form-group-error">
            <span>{{ errors.id }}</span>
          </span>
        </div>
        <div class="form-group col-offset-4 l-12">
          <label class="form-group-label" for=""
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Tên danh
            mục</label
          >
          <input
            id="username"
            class="form-group-input"
            type="text"
            placeholder="Nhập tên danh mục"
            :class="{ 'input-error': errors.name }"
            @focus="hideError('name')"
            v-model="category.name"
          />
          <span class="form-group-error">
            <span>{{ errors.name }}</span>
          </span>
        </div>
        <div class="form-group col-offset-4 l-12">
          <label class="form-group-label" for="username">Trạng thái</label>
          <select class="form-group-input" @focus="hideError('status')" v-model="category.status">
            <option :value="s.id" v-for="s in status">
              {{ s.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group col-offset-4 l-12">
      <button class="form-group-btn" type="submit">Đồng ý</button>
    </div>
  </form>
</template>

<style scope>
.form {
  background-color: var(--white-background-color);
  border-radius: 4px;
  padding: 10px 10px;
}

.image {
  width: 100%;
  height: 210px;
}
</style>
