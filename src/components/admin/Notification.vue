<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import { ref } from 'vue'

const image = ref<string>(AppHelper.imageBell)
</script>

<template>
  <div v-dropdown class="notification">
    <div class="notification-container">
      <font-awesome-icon class="notification-icon" :icon="['fas', 'bell']" />
    </div>
    <div class="notification-list">
      <div class="scroll-bar">
        <a class="notification-item">
          <div class="notification-item-img">
            <img :src="image" alt="" />
          </div>
          <div class="notification-item-info">
            <div class="notification-item-info-body">
              <p>Có đơn đặt hàng từ khách hàng Nguyễn Văn 1F</p>
            </div>
            <div class="notification-item-info-datetime">Ngày: asd</div>
          </div>
        </a>
        <a class="notification-item">
          <div class="notification-item-img">
            <img :src="image" alt="" />
          </div>
          <div class="notification-item-info">
            <div class="notification-item-info-body">
              <p>Có đơn đặt hàng từ khách hàng Nguyễn Văn 1F</p>
            </div>
            <div class="notification-item-info-datetime">Ngày: asd</div>
          </div>
        </a>
        <a class="notification-item">
          <div class="notification-item-img">
            <img :src="image" alt="" />
          </div>
          <div class="notification-item-info">
            <div class="notification-item-info-body">
              <p>Có đơn đặt hàng từ khách hàng Nguyễn Văn 1F</p>
            </div>
            <div class="notification-item-info-datetime">Ngày: asd</div>
          </div>
        </a>
        <a class="notification-item">
          <div class="notification-item-img">
            <img :src="image" alt="" />
          </div>
          <div class="notification-item-info">
            <div class="notification-item-info-body">
              <p>Có đơn đặt hàng từ khách hàng Nguyễn Văn 1F</p>
            </div>
            <div class="notification-item-info-datetime">Ngày: asd</div>
          </div>
        </a>
        <a class="notification-item">
          <div class="notification-item-img">
            <img :src="image" alt="" />
          </div>
          <div class="notification-item-info">
            <div class="notification-item-info-body">
              <p>Có đơn đặt hàng từ khách hàng Nguyễn Văn 1F</p>
            </div>
            <div class="notification-item-info-datetime">Ngày: asd</div>
          </div>
        </a>
        <a class="notification-item">
          <div class="notification-item-img">
            <img :src="image" alt="" />
          </div>
          <div class="notification-item-info">
            <div class="notification-item-info-body">
              <p>Có đơn đặt hàng từ khách hàng Nguyễn Văn 1F</p>
            </div>
            <div class="notification-item-info-datetime">Ngày: asd</div>
          </div>
        </a>
      </div>
      <div class="show-notification">
        <a class="">Xem thêm</a>
      </div>
    </div>
    <!-- <div class="row notification_empty">
      <div class="notification-empty-content">
        <span>Không có thông báo mới</span>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.notification {
  position: relative;
  display: flex;
}

.notification-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--white-color);
}

.notification .notification-icon {
  width: 30px;
  height: 30px;
}

.notification .notification-name {
  margin-left: 5px;
}

.notification-list {
  background-color: var(--white-background-color);
  border-radius: 4px;
  display: none;
  position: absolute;
  padding: 6px 0px 6px 6px;
  right: 0px;
  top: 46px;
  width: 300px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
}

.scroll-bar {
  height: calc(5 * 68px);
  overflow-y: auto;
}

.scroll-bar::-webkit-scrollbar {
  width: 6px;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.scroll-bar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.notification-list::before {
  position: absolute;
  content: '';
  border-style: solid;
  border-color: transparent transparent var(--white-background-color) transparent;
  border-width: 6px 6px;
  right: 14px;
  top: -10px;
}

.notification-item {
  display: flex;
  padding: 6px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-color);
  cursor: pointer;
}

.notification-item:hover {
  background-color: var(--acctive-color);
  color: var(--white-color);
}

.notification-item-img {
  width: 56px;
  height: 56px;
  margin-right: 6px;
}

.notification-item-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.notification-item-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.notification-item-info .notification-item-info-body {
  width: 100%;
}

.notification-item-info .notification-item-info-body p {
  font-size: 0.9em;
}

.notification-item-info .notification-item-info-datetime {
  font-size: 0.8em;
}

.show-notification {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0px;
}

.show-notification:hover {
  text-decoration: underline;
}
</style>
