<script setup lang="ts">
import { reactive, ref } from 'vue'
import Account from '../../models/AccountInforModel'
import ValidateAccount from '../../models/ValidateAccount'
import type { GenderModel } from '@/models/GenderModel'
import AppHelper from '@/helpers/AppHelper'
import stores from '@/stores/Store'
import { useModal } from '@/composables/ModalComposable'
import type ApiResponseModel from '@/models/ApiResponseModel'
import type AccountModel from '../../models/AccountInforModel'
import Modal from '../common/Modal.vue'
import CodeHelper from '@/helpers/CodeHelper'

const modal = useModal()

const account = reactive<Account>(new Account())

const errors = reactive<ValidateAccount>(new ValidateAccount())

const imagePath = ref<string>(AppHelper.imageDefalut)

const file = ref<File>()

const image = ref<string>('')

const message = ref<string>('')

let genders: GenderModel[] = [
  { id: -1, name: 'Lựa chọn giới tính' },
  { id: 0, name: 'Nam' },
  { id: 1, name: 'Nữ' }
]

account.infor.gender = genders[0].id

const hideError = (field: string) => {
  if (field == 'username' && errors.username != '') {
    errors.username = ''
  } else if (field == 'password' && errors.password != '') {
    errors.password = ''
  } else if (field == 'conformPassword' && errors.conformPassword != '') {
    errors.conformPassword = ''
  } else if (field == 'file' && errors.file != '') {
    errors.file = ''
  } else if (field == 'phoneNumber' && errors.phoneNumber != '') {
    errors.phoneNumber = ''
  } else if (field == 'fullName' && errors.fullName != '') {
    errors.fullName = ''
  } else if (field == 'address' && errors.address != '') {
    errors.address = ''
  } else if (field == 'gender' && errors.gender != '') {
    errors.gender = ''
  } else if (field == 'dob' && errors.dob != '') {
    errors.dob = ''
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
  errors.file = image.value ? '' : 'Trường này cần nhập'
  errors.username = account.username ? '' : 'Trường này cần nhập'
  errors.password = account.password ? '' : 'Trường này cần nhập'
  errors.conformPassword = account.conformPassword ? '' : 'Trường này cần nhập'
  if (account.password && account.conformPassword) {
    errors.conformPassword =
      account.password == account.conformPassword ? '' : 'Xác nhận mật khẩu thất bại'
  }
  errors.fullName = account.infor?.fullName ? '' : 'Trường này cần nhập'
  errors.phoneNumber = account.infor?.phoneNumber ? '' : 'Trường này cần nhập'
  errors.address = account.infor?.phoneNumber ? '' : 'Trường này cần nhập'
  errors.dob = account.infor?.dob ? '' : 'Trường này cần nhập'
  errors.gender = account.infor?.gender != -1 ? '' : 'Trường này cần nhập'
  return (
    !errors.username &&
    !errors.file &&
    !errors.conformPassword &&
    !errors.password &&
    !errors.fullName &&
    !errors.phoneNumber &&
    !errors.address &&
    !errors.dob &&
    !errors.gender
  )
}

const selectedAcction = () => {
  modal.close()
}

const submit = async () => {
  if (validate()) {
    try {
      const formData = new FormData()
      formData.append('image', file.value!)
      formData.append('data', JSON.stringify(account))
      let result: ApiResponseModel<AccountModel> = await stores.dispatch(
        'auth/registerEmployeeAccount',
        formData
      )
      message.value = result.message
      modal.open('Thông báo', false, undefined, 'message')
    } catch (error: any) {
      if (error.code == CodeHelper.ERROR_Name_EXIST) {
        errors.username = error.message
      } else if (error.code == CodeHelper.ERROR_PHONE_EXIST) {
        errors.phoneNumber = error.message
      }
    }
  }
}
</script>

<template>
  <div class="content-main">
    <form action="" class="form row" @submit.prevent="submit">
      <div class="form-group col-offset-4 l-12">
        <h2 class="form-group-title">Mẫu thông tin nhân viên</h2>
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
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span v-if="errors.file">{{ errors.file }}</span>
          </span>
        </div>
      </div>
      <div class="col-offset-4 l-8">
        <div class="row l-12">
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Tên tài khoản</label>
            <input
              :class="{ 'input-error': errors.username }"
              @focus="hideError('username')"
              v-model="account.username"
              class="form-group-input"
              type="text"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span v-if="errors.username">{{ errors.username }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for=""> Số điện thoại</label>
            <input
              :class="{ 'input-error': errors.phoneNumber }"
              @focus="hideError('phoneNumber')"
              v-model="account.infor.phoneNumber"
              class="form-group-input"
              type="text"
              placeholder="Nhập số điện thoại"
            />
            <span class="form-group-error">
              <span v-if="errors.phoneNumber">{{ errors.phoneNumber }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Mật khẩu</label>
            <input
              :class="{ 'input-error': errors.password }"
              @focus="hideError('password')"
              v-model="account.password"
              class="form-group-input"
              type="password"
              placeholder="Nhập mật khẩu"
            />
            <span class="form-group-error">
              <span v-if="errors.password">{{ errors.password }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Xác nhận mật khẩu</label>
            <input
              :class="{ 'input-error': errors.conformPassword }"
              @focus="hideError('conformPassword')"
              v-model="account.conformPassword"
              class="form-group-input"
              type="password"
              placeholder="Xác nhận mật khẩu"
            />
            <span class="form-group-error">
              <span v-if="errors.conformPassword">{{ errors.conformPassword }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Họ và tên</label>
            <input
              :class="{ 'input-error': errors.fullName }"
              @focus="hideError('fullName')"
              v-model="account.infor.fullName"
              class="form-group-input"
              type="text"
              placeholder="Nhập họ tên"
            />
            <span class="form-group-error">
              <span v-if="errors.fullName">{{ errors.fullName }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-3">
            <label class="form-group-label" for="username"> Ngày sinh</label>
            <input
              :class="{ 'input-error': errors.dob }"
              @focus="hideError('dob')"
              v-model="account.infor!.dob"
              class="form-group-input"
              type="date"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span v-if="errors.dob">{{ errors.dob }}</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-3">
            <label class="form-group-label" for="username"> Giới tính</label>
            <select
              :class="{ 'input-error': errors.gender }"
              @focus="hideError('gender')"
              v-model="account.infor.gender"
              class="form-group-input"
            >
              <option
                :value="gender.id"
                v-for="gender in genders"
                :disabled="gender.id == -1"
                :selected="gender.id == -1"
              >
                {{ gender.name }}
              </option>
            </select>
            <span class="form-group-error">
              <span v-if="errors.gender">{{ errors.gender }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="form-group col-offset-4 l-12">
        <label class="form-group-label" for="username">Địa chỉ nhà</label>
        <textarea
          :class="{ 'input-error': errors.address }"
          @focus="hideError('address')"
          v-model="account.infor!.address"
          class="form-group-input"
          type="text"
          placeholder="Nhập địa chỉ nhà"
        ></textarea>
        <span class="form-group-error">
          <span v-if="errors.address">{{ errors.address }}</span>
        </span>
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
