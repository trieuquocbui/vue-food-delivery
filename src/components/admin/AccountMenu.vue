<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import { ref } from 'vue'

const image = ref<string>(AppHelper.imageDefalut)
</script>

<template>
  <div v-dropdown class="user-box">
    <div class="user-box-container">
      <img class="user-box-img" :src="image" alt="" />
      <span class="user-box-name">buiquoctrieu</span>
    </div>
    <div class="user-box-list">
      <div class="user-box-item">
        <a class="user-box-link">Hồ sơ</a>
      </div>
      <div class="user-box-item">
        <a class="user-box-link">Thoát</a>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.user-box {
  position: relative;
  display: flex;
}

.user-box-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--white-color);
}

.user-box .user-box-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-box .user-box-name {
  margin-left: 5px;
}

.user-box-list {
  background-color: var(--white-background-color);
  border-radius: 4px;
  display: none;
  position: absolute;
  padding: 6px;
  right: 0px;
  top: 46px;
  width: 140px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
}

.user-box-list::before {
  position: absolute;
  content: '';
  border-style: solid;
  border-color: transparent transparent var(--white-background-color) transparent;
  border-width: 6px 6px;
  left: 28px;
  top: -10px;
}

.user-box-item .user-box-link {
  display: block;
  width: 100%;
  padding: 6px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-color);
  display: block;
  cursor: pointer;
}

.user-box-item .user-box-link:hover {
  background-color: var(--acctive-color);
  color: var(--white-color);
}
</style>
