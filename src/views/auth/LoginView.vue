<script setup lang="ts">
import LoginModel from '@/models/Login'
import { reactive, ref } from 'vue'
import { login } from '@/services/AuthService'
import type APIResponse from '@/models/ApiResponse'
import stores from '@/stores/Store'
import router from '@/router'
import Code from '@/helpers/CodeHelper'

let loginModel = reactive(new LoginModel())

let errors = reactive(new LoginModel())

let error = ref('')

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
    let result: APIResponse = await login(loginModel)
    if (result.code == Code.SUCCESS) {
      stores.dispatch('auth/login', result.data)
      router.push({ path: '/admin/home' })
    } else {
    }

    console.log(stores.getters['auth/getRole'])
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
