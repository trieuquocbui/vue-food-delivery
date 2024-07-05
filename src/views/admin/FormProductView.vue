<script setup lang="ts">
import type NavModel from '@/models/NavModel'
import Breadcrumb from '@/components/admin/Breadcrumb.vue'

let breadcrumb: NavModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách sản phẩm', path: '/admin/proudct' },
  { title: 'Tạo sản phẩm', path: '' }
]
</script>

<template>
  <div class="content">
    <Breadcrumb :navs="breadcrumb"></Breadcrumb>
    <div class="content-heading mb-10">
      <h2>Biểu mẫu nhập thông tin sản phẩm</h2>
    </div>
    <div class="content-main mb-10">
      <form action="" class="form row">
        <div class="form-group mt-10 col l-6">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Tên tài
            khoản</label
          >
          <input
            id="username"
            class="form-group-input"
            type="text"
            formControlName="username"
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span>Tên tài khoản đã tồn tại</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-6">
          <label class="form-group-label" for=""
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Số điện
            thoại</label
          >
          <input
            id="username"
            class="form-group-input"
            type="text"
            placeholder="Nhập số điện thoại"
          />
          <span class="form-group-error">
            <span>Số điện thoại đã tồn tại</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-6">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Mật khẩu</label
          >
          <input
            id="username"
            class="form-group-input"
            type="text"
            formControlName="username"
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span>Mật khẩu từ 6 - 24 kí tự</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-6">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Xác nhận mật
            khẩu</label
          >
          <input
            id="username"
            class="form-group-input"
            type="text"
            formControlName="username"
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span>Xác nhận mật khẩu không chính xác</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-8">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Họ và tên</label
          >
          <input
            id="username"
            class="form-group-input"
            type="text"
            formControlName="username"
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span>Trường này cần nhập</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-2">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Ngày sinh</label
          >
          <input
            id="username"
            class="form-group-input"
            type="date"
            formControlName="username"
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span>Trường này cầ nhập</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-2">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Giới tính</label
          >
          <input
            id="username"
            class="form-group-input"
            type="text"
            formControlName="username"
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span>Trường này cần chọn</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-12">
          <label class="form-group-label" for="username"
            ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Địa chỉ
            nhà</label
          >
          <textarea
            id="username"
            class="form-group-input"
            type="text"
            placeholder="Nhập địa chỉ nhà"
          ></textarea>
          <span class="form-group-error">
            <span>Trường này cần nhập</span>
          </span>
        </div>
        <div class="form-group mt-10 col l-12">
          <button class="form-group-btn" type="submit">Đồng ý</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scope>
.form {
  padding: 20px;
}
</style>
