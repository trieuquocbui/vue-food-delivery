<script setup lang="ts">
import type LoginModel from '@/models/LoginModel'
import { reactive, ref } from 'vue'
import stores from '@/stores/Store'
import router from '@/router'
import Code from '@/helpers/CodeHelper'
import type APIResponse from '@/models/ApiResponseModel'

let loginModel = reactive<LoginModel>({ username: '', password: '' })

let errors = reactive<LoginModel>({ username: '', password: '' })

const hideError = (field: string) => {
  if (field == 'username' && errors.username != '') {
    errors.username = ''
  } else if (field == 'password' && errors.password != '') {
    errors.password = ''
  }
}

const validate = () => {
  errors.username = loginModel.username ? '' : 'Trường này cần nhập'
  errors.password = loginModel.password ? '' : 'Trường này cần nhập'
  return !errors.username && !errors.password
}

const submitLogin = async () => {
  if (validate()) {
    try {
      let data: APIResponse<string> = await stores.dispatch('auth/login', loginModel)
      if (data.code == Code.SUCCESS) {
        router.push({ path: '/admin/home' })
      }
    } catch (error: any) {
      if (error.code == Code.WRONG_PASSWORD) {
        errors.password = error.message
      } else if (error.code == Code.ENTITY_NOT_EXIST) {
        errors.username = error.message
      }
    }
  }
}
</script>

<template>
  <div class="login">
    <form class="form" @submit.prevent="submitLogin">
      <div class="form-group">
        <h2 class="form-group-title">Đăng nhập</h2>
      </div>
      <div class="form-group mt-10">
        <label class="form-group-label" for="username"
          ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Tên tài
          khoản</label
        >
        <input
          :class="{ 'input-error': errors.username }"
          @focus="hideError('username')"
          v-model="loginModel.username"
          id="username"
          class="form-group-input"
          type="text"
          formControlName="username"
          placeholder="Nhập tên tài khoản"
        />

        <span class="form-group-error">
          <span v-if="errors.username">{{ errors.username }}</span>
        </span>
      </div>
      <div class="form-group mt-10">
        <label class="form-group-label" for="password"
          ><font-awesome-icon class="form-group-icon" :icon="['fas', 'lock']" /> Mật khẩu</label
        >
        <input
          :class="{ 'input-error': errors.password }"
          @focus="hideError('password')"
          v-model="loginModel.password"
          id="password"
          class="form-group-input"
          type="password"
          formControlName="password"
          placeholder=" Nhập mật khẩu"
        />
        <span class="form-group-error">
          <span v-if="errors.password">{{ errors.password }}</span>
        </span>
      </div>
      <div class="form-group mt-10">
        <button class="form-group-btn" type="submit">Đăng nhập</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white-background-color);
}

.form {
  background-color: var(--white-color);
  padding: 20px;
  border-radius: 10px;
  width: 500px;
}
</style>
