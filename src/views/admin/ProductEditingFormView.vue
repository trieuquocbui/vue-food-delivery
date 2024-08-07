<script setup lang="ts">
import type NavModel from '@/models/NavModel'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import { useModal } from '@/composables/ModalComposable'
import ProductModel from '@/models/ProductModel'
import { onMounted, reactive, ref } from 'vue'
import ValidatedProductModel from '@/models/ValidatedProductModel'
import AppHelper from '@/helpers/AppHelper'
import type StatusModel from '@/models/StatusModel'
import stores from '@/stores/Store'
import type APIResponseModel from '@/models/ApiResponseModel'
import CodeHelper from '@/helpers/CodeHelper'
import CategoryModel from '@/models/CategoryModel'
import Modal from '../common/Modal.vue'
import { useRoute } from 'vue-router'

let breadcrumb: NavModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách sản phẩm', path: '/admin/product' },
  { title: 'Chỉnh sửa sản phẩm', path: '' }
]

const modal = useModal()
const route = useRoute()

const product = reactive<ProductModel>({
  _id: '',
  category: new CategoryModel(),
  name: '',
  description: '',
  status: true,
  featured: false,
  thumbnail: ''
})

const errors = reactive<ValidatedProductModel>(new ValidatedProductModel())

let categoryList = reactive<CategoryModel[]>([])

const imagePath = ref<string>(AppHelper.imageDefalut)

const file = ref<File>()

const image = ref<string>('')

const message = ref<string>('')

let status: StatusModel[] = [
  { id: true, name: 'Đang kinh doanh' },
  { id: false, name: 'Ngừng kinh doanh' }
]

const hideError = (field: string) => {
  if (field == 'name' && errors.name != '') {
    errors.name = ''
  } else if (field == 'quantity' && errors.quantity != undefined) {
    errors.quantity = ''
  } else if (field == 'categoryId' && errors.categoryId != '') {
    errors.categoryId = ''
  }
}

const categoryModel = (value: CategoryModel): CategoryModel => {
  return value
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
  errors.name = product.name ? '' : 'Trường này cần nhập'
  errors.quantity = product.quantity ? '' : 'Trường này cần nhập'
  errors.categoryId = product.category ? '' : 'Trường này cần nhập'
  return !errors.name && !errors.quantity && !errors.categoryId
}

const selectedAcction = () => {
  modal.close()
}

const submit = async () => {
  if (validate()) {
    try {
      const formData = new FormData()
      if (file.value) {
        formData.append('image', file.value)
      }
      formData.append('data', JSON.stringify(product))
      let result: APIResponseModel<ProductModel> = await stores.dispatch('product/updateProduct', {
        productId: product._id,
        formData: formData
      })
      message.value = result.message
      modal.open('Thông báo', false, undefined, 'message')
    } catch (error: any) {}
  }
}

const fetchCategoryList = async () => {
  try {
    let reslut: APIResponseModel<CategoryModel[]> = await stores.dispatch('category/getAll')
    if (reslut.code == CodeHelper.SUCCESS && reslut.data) {
      categoryList = reslut.data
    }
  } catch (error) {}
}

const fetchProduct = async () => {
  try {
    let reslut: APIResponseModel<CategoryModel[]> = await stores.dispatch(
      'product/getProduct',
      route.params.productId
    )
    if (reslut.code == CodeHelper.SUCCESS && reslut.data) {
      Object.assign(product, reslut.data)
      imagePath.value = AppHelper.imagePath + product.thumbnail
    }
  } catch (error) {}
}

onMounted(() => {
  fetchProduct()
  fetchCategoryList()
})
</script>

<template>
  <Breadcrumb :navs="breadcrumb"></Breadcrumb>
  <div class="content-heading mb-10">
    <h2>Biểu mẫu nhập thông tin sản phẩm</h2>
  </div>
  <div class="content-main mb-10">
    <form action="" class="form row" @submit.prevent="submit">
      <div class="form-group col-offset-4 l-12">
        <h2 class="form-group-title">Mẫu nhập thông tin sản phẩm</h2>
      </div>
      <div class="col-offset-4 l-4">
        <div class="image-container">
          <img :src="imagePath" alt="" class="image" />
        </div>
        <div class="form-group">
          <input
            :class="{ 'input-error': errors.file }"
            @focus="hideError('file')"
            @change="handleFileChange"
            class="form-group-input"
            type="file"
          />
        </div>
      </div>
      <div class="col-offset-4 l-8">
        <div class="row l-12">
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username"> Mã sản phẩm</label>
            <input
              v-model="product._id"
              class="form-group-input"
              type="text"
              placeholder="Nhập mã"
              disabled
            />
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for=""> Tên sản phẩm</label>
            <input
              :class="{ 'input-error': errors.name }"
              @focus="hideError('name')"
              v-model="product.name"
              class="form-group-input"
              type="text"
              placeholder="Nhập tên sản phẩm"
            />
            <span class="form-group-error">
              <span>{{ errors.name }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username"> Số lượng</label>
            <input
              :class="{ 'input-error': errors.quantity }"
              @focus="hideError('quantity')"
              v-model="product.quantity"
              class="form-group-input"
              type="number"
              placeholder="Nhập số lượng"
              min="0"
            />
            <span class="form-group-error">
              <span>{{ errors.quantity }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Danh mục</label>
            <select
              class="form-group-input"
              :class="{ 'input-error': errors.categoryId }"
              @focus="hideError('categoryId')"
              v-model="categoryModel(product.category as CategoryModel)._id"
            >
              <option :value="''" disabled selected>Lựa chọn danh mục</option>
              <option :value="category._id" v-for="category in categoryList">
                {{ category.name }}
              </option>
            </select>
            <span class="form-group-error">
              <span>{{ errors.categoryId }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Trạng thái</label>
            <select class="form-group-input" v-model="product.status">
              <option :value="s.id" v-for="s in status">{{ s.name }}</option>
            </select>
          </div>
          <div class="form-group col-offset-4 l-3">
            <label class="form-group-label" for="username">Sản phẩm nổi bật</label>
            <div class="toggle-container">
              <input
                v-model="product.featured"
                type="checkbox"
                id="toggle"
                class="toggle-checkbox"
              />
              <label for="toggle" class="toggle-label"></label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group col-offset-4 l-12">
        <label class="form-group-label" for="username"> Mô tả sản phẩm</label>
        <textarea
          v-model="product.description"
          id="username"
          class="form-group-input"
          type="text"
          placeholder="Nhập mô tả sản phẩm"
        ></textarea>
      </div>
      <div class="form-group col-offset-4 l-12">
        <button class="form-group-btn" type="submit">Đồng ý</button>
      </div>
    </form>
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
