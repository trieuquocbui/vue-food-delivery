<script setup lang="ts"></script>
<template>
  <div class="content-main">
    <form action="" class="form row">
      <div class="form-group col-offset-4 l-12">
        <h2 class="form-group-title">Mẫu nhập thông tin nhân viên</h2>
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
            <label class="form-group-label" for="username">Tên tài khoản</label>
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
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for=""> Số điện thoại</label>
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
            <label class="form-group-label" for="username">Mật khẩu</label>
            <input
              id="username"
              class="form-group-input"
              type="text"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span>Mật khẩu từ 6 - 24 kí tự</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username"> Xác nhận mật khẩu</label>
            <input
              id="username"
              class="form-group-input"
              type="text"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span>Xác nhận mật khẩu không chính xác</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-6">
            <label class="form-group-label" for="username">Họ và tên</label>
            <input
              id="username"
              class="form-group-input"
              type="text"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span>Trường này cần nhập</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-3">
            <label class="form-group-label" for="username"> Ngày sinh</label>
            <input
              id="username"
              class="form-group-input"
              type="date"
              placeholder="Nhập tên tài khoản"
            />
            <span class="form-group-error">
              <span>Trường này cầ nhập</span>
            </span>
          </div>
          <div class="form-group col-offset-4 l-3">
            <label class="form-group-label" for="username"> Giới tính</label>
            <select class="form-group-input">
              <option value="" disabled selected>Lựa chọn giới tính</option>
              <option value="">Nam</option>
              <option value="">Nữ</option>
            </select>
            <span class="form-group-error">
              <span>Trường này cần chọn</span>
            </span>
          </div>
        </div>
      </div>

      <div class="form-group col-offset-4 l-12">
        <label class="form-group-label" for="username">Địa chỉ nhà</label>
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
</style>
