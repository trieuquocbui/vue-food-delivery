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
  <Breadcrumb :navs="breadcrumb"></Breadcrumb>
  <div class="content-heading mb-10">
    <h2>Biểu mẫu nhập thông tin sản phẩm</h2>
  </div>
  <div class="content-main mb-10">
    <form action="" class="form row">
      <div class="form-group col-offset-4 l-12">
        <h2 class="form-group-title">Mẫu nhập thông tin sản phẩm</h2>
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
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username"
              ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Mã sản
              phẩm</label
            >
            <input
              id="username"
              class="form-group-input"
              type="text"
              formControlName="username"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span>Mã sản phẩm đã tồn tại</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for=""
              ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Tên sản
              phẩm</label
            >
            <input
              id="username"
              class="form-group-input"
              type="text"
              placeholder="Nhập số điện thoại"
            />
            <span class="form-group-error">
              <span>Trường này cần nhập</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username"
              ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" />Giá</label
            >
            <input
              id="username"
              class="form-group-input"
              type="number"
              formControlName="username"
              placeholder="Nhập giá"
            />
            <span class="form-group-error">
              <span>Trường này cần nhập</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username"
              ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Số lượng</label
            >
            <input
              id="username"
              class="form-group-input"
              type="number"
              formControlName="username"
              placeholder="Nhập số lượng"
            />
            <span class="form-group-error">
              <span>Xác nhận mật khẩu không chính xác</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Danh mục</label>
            <select class="form-group-input">
              <option value="" disabled selected>Lựa chọn danh mục</option>
              <option value="">Cơm tắm</option>
              <option value="">Hủ tiếu</option>
            </select>
            <span class="form-group-error">
              <span>Trường này cần nhập</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-3">
            <label class="form-group-label" for="username">Trạng thái</label>
            <select class="form-group-input">
              <option value="" disabled selected>Lựa chọn</option>
              <option value="">Kinh doanh</option>
              <option value="">Ngừng kinh doanh</option>
            </select>
            <span class="form-group-error">
              <span>Trường này cầ nhập</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-3">
            <label class="form-group-label" for="username">Sản phẩm nổi bật</label>
            <div class="toggle-container">
              <input type="checkbox" id="toggle" class="toggle-checkbox" />
              <label for="toggle" class="toggle-label"></label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group col-offset-4 l-12">
        <label class="form-group-label" for="username"
          ><font-awesome-icon class="form-group-icon" :icon="['fas', 'user']" /> Mô tả sản
          phẩm</label
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

.toggle-container {
  position: relative;
  width: 60px;
  height: 30px;
  margin-top: 5px;
}

.toggle-checkbox {
  display: none;
}

.toggle-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #66bb6a;
}

.toggle-checkbox:checked + .toggle-label::after {
  transform: translateX(30px);
}
</style>
