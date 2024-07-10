<script setup lang="ts">
import Breadcrumb from '@/components/admin/Breadcrumb.vue'
import type BreadcrumbModel from '@/models/NavModel'

let breadcrumb: BreadcrumbModel[] = [
  { title: 'Trang chủ', path: '/admin/home' },
  { title: 'Danh sách danh mục', path: '/admin/category' },
  { title: 'Tạo danh mục', path: '' }
]
</script>
<template>
  <Breadcrumb :navs="breadcrumb"></Breadcrumb>
  <div class="content-heading mb-10">
    <h2>Tạo danh mục</h2>
  </div>
  <div class="content-main">
    <form action="" class="form row">
      <div class="form-group col-offset-4 l-12">
        <h2 class="form-group-title">Mẫu nhập thông tin danh mục</h2>
      </div>
      <div class="col-offset-4 l-4">
        <div class="image-container">
          <img src="../../assets/images/th.jpg" alt="" class="image" />
        </div>
        <div class="form-group">
          <input
            id="username"
            class="form-group-input"
            type="file"
            formControlName="username"
            placeholder="Nhập tên tài khoản"
          />
          <span class="form-group-error">
            <span>Vui lòng chọn hình ảnh</span>
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
              id="username"
              class="form-group-input"
              type="text"
              formControlName="username"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span>Mã danh mục đã tồn tại</span>
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
              placeholder="Nhập số điện thoại"
            />
            <span class="form-group-error">
              <span>Số điện thoại đã tồn tại</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Trạng thái</label>
            <select class="form-group-input">
              <option value="" disabled selected>Lựa chọn</option>
              <option value="">Kinh doanh</option>
              <option value="">Ngừng kinh doanh</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group col-offset-4 l-12">
        <button class="form-group-btn" type="submit">Đồng ý</button>
      </div>
    </form>
  </div>
</template>

<style scope>
.form {
  background-color: var(--white-background-color);
  border-radius: 4px;
  padding: 10px 10px;
}

.image-container {
}

.image {
  width: 100%;
  height: 210px;
}
</style>
