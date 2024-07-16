<script setup lang="ts">
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'
import CategoryForm from '../../components/admin/CategoryForm.vue'
import { onMounted, reactive, ref } from 'vue'
import type CategoryModel from '@/models/CategoryModel'
import { useRoute } from 'vue-router'
import stores from '@/stores/Store'
import type ApiResponseModel from '@/models/ApiResponseModel'
import CodeHelper from '@/helpers/CodeHelper'
import Modal from '../../views/common/Modal.vue'
import { useModal } from '@/composables/ModalComposable'
import ValidatedCategoryModel from '@/models/ValidatedCategoryModel'

const route = useRoute()
const modal = useModal()

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách danh mục', path: '/admin/category' },
  { title: 'Tạo danh mục', path: '' }
]

if (route.params.categoryId) {
  breadcrumb[2].title = 'cập nhật danh mục'
}

const message = ref<string>('')

let category = reactive<CategoryModel>({
  _id: '',
  name: '',
  thumbnail: '',
  status: true
})

const errors = reactive<ValidatedCategoryModel>(new ValidatedCategoryModel())

const action = async (action: string, formData: FormData) => {
  try {
    let result: ApiResponseModel<CategoryModel>
    if (action == 'update') {
      result = await stores.dispatch('category/updateCategory', {
        id: category._id,
        formData: formData
      })
    } else {
      result = await stores.dispatch('category/createCategory', formData)
    }
    message.value = result.message
    modal.open('Thông báo', false, undefined, 'message')
  } catch (error: any) {
    if (error.code == CodeHelper.ERROR_NAME_EXIST) {
      errors.name = error.message
    }
    let data: CategoryModel = JSON.parse(formData.get('data') as string) as CategoryModel
    category._id = data._id
    category.name = data.name
    category.thumbnail = data.thumbnail
    category.status = data.status
  }
}

const selectedAcction = () => {
  modal.close()
}

onMounted(async () => {
  if (route.params.categoryId) {
    let categoryId: string = String(route.params.categoryId)
    let result: ApiResponseModel<CategoryModel> = await stores.dispatch(
      'category/getCategory',
      categoryId
    )
    if (result.data && result.code == CodeHelper.SUCCESS) {
      category._id = result.data._id
      category.name = result.data.name
      category.thumbnail = result.data.thumbnail
      category.status = result.data.status
    }
  }
})
</script>
<template>
  <Breadcrumb :navs="breadcrumb"></Breadcrumb>
  <div class="content-heading mb-10">
    <h2>{{ breadcrumb[2].title }}</h2>
  </div>
  <div class="content-main">
    <CategoryForm :category="category" :errors="errors" @action="action"></CategoryForm>
  </div>
  <Modal v-bind="modal.data" @selected-acction="selectedAcction">
    <template #content v-if="modal.data.type == 'message'">
      <p>{{ message }}</p>
    </template>
  </Modal>
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
