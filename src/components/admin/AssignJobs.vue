<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'

const image = AppHelper.imageDefalut
</script>
<template>
  <div class="assign-job">
    <div class="employee-search">
      <form class="employee-search-form">
        <input
          class="employee-search-form-input"
          type="search"
          placeholder="Tìm nhân viên theo tên"
        />
      </form>
    </div>
    <div class="employee-list">
      <div class="employee-list-item">
        <div class="l-1-o-5">
          <img :src="image" alt="" class="employee-list-item-image" />
        </div>
        <div class="l-7-0-5 employee-list-item-name">Bùi Quốc Triệu</div>
        <div class="l-3">
          <div class="operation row">
            <button class="l-12 btn-assign-job" title="Phân công">Phân công</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="employee-load-more">
    <button class="btn-load-more">Tải thêm</button>
  </div>
</template>

<style scoped>
.assign-job {
}
.employee-search {
}

.employee-search-form {
}

.employee-load-more {
  margin-top: 6px;
}

.btn-load-more {
  padding: 8px;
  border-radius: 20px;
  border: none;
  outline: none;
  color: var(--text-color);
  background-color: var(--unacctive-color);
  cursor: pointer;
}

.btn-load-more:hover {
  background-color: var(--acctive-color);
  color: var(--white-color);
}

.employee-search-form-input {
  border: 0.5px solid var(--border-color);
  margin-top: 4px;
  border-radius: 20px;
  padding: 10px;
  width: 100%;
}

.employee-search-form-input:focus {
  outline: none;
  border: 0.5px solid var(--acctive-color);
}

.employee-list {
  padding-right: 4px;
  height: calc(6 * 49px);
  overflow-y: auto;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
}

.employee-list::-webkit-scrollbar {
  width: 4px;
}

.employee-list::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.employee-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.employee-list-item {
  height: 49px;
  display: flex;
  align-items: center;
  text-align: start;
}

.employee-list-item-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.employee-list-item-name {
  padding-left: 6px;
}

.employee-list-item-status .circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.employee-list-item-status .online {
  width: 8px;
  height: 8px;
  background-color: var(--online-status-color);
  border-radius: 50%;
}

.btn-assign-job {
  width: 100%;
  padding: 6px;
  border-radius: 20px;
  border: none;
  outline: none;
  color: var(--text-color);
  background-color: var(--unacctive-color);
  cursor: pointer;
}

.btn-assign-job:hover {
  background-color: var(--acctive-color);
  color: var(--white-color);
}
</style>
