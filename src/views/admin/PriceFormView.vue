<script setup lang="ts"></script>
<template>
  <div class="content-main">
    <form action="" class="form row">
      <div class="form-group col-offset-4 l-12">
        <h2 class="form-group-title">Mẫu nhập thông tin giá mới</h2>
      </div>
      <div class="form-group col-offset-4 l-12">
        <div class="form-group">
          <label class="form-group-label" for="username"> Giá mới</label>
          <input id="username" class="form-group-input" type="number" placeholder="Nhập tên giá" />
          <span class="form-group-error">
            <span>Trường này cần nhập</span>
          </span>
        </div>
        <div class="form-group">
          <label class="form-group-label" for="username"> Ngày áp dụng</label>
          <input id="username" class="form-group-input" type="date" />
          <span class="form-group-error">
            <span>Trường này cần nhập</span>
          </span>
        </div>
      </div>
      <div class="form-group col-offset-4 l-12">
        <button class="form-group-btn" type="submit">Đồng ý</button>
      </div>
    </form>
  </div>
</template>

<style>
.form {
  background-color: var(--white-background-color);
  border-radius: 4px;
  padding: 10px 10px;
}
</style>
