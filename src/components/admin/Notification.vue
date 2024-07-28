<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import PagenationHelper from '@/helpers/PagenationHelper'
import type APIResponseModel from '@/models/ApiResponseModel'
import type NotificationDetailsModel from '@/models/NotificationDetails'
import type NotificationModel from '@/models/NotificationModel'
import type PagenationModel from '@/models/PagenationModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import stores from '@/stores/Store'
import { format } from 'date-fns'
import { onMounted, reactive, ref, watch } from 'vue'

const image = ref<string>(AppHelper.imageBell)

const pagenation = reactive<PagenationModel<NotificationDetailsModel[]>>({
  currentPageNumber: PagenationHelper.CURRENT_PAGE_NUMBER,
  offset: PagenationHelper.OFFSET,
  totalPageNumber: 0,
  searchQuery: PagenationHelper.SEARCH_QUERY,
  sortField: PagenationHelper.SORT_FIELD,
  sortOrder: PagenationHelper.SORT_ORDER,
  isLastPage: false,
  data: []
})

const queries = reactive<QueryModel>({
  page: pagenation.currentPageNumber,
  limit: pagenation.offset,
  sortField: pagenation.sortField,
  sortOrder: pagenation.sortOrder
})

const fetchData = async () => {
  try {
    const result: APIResponseModel<PagenationResponseModel<NotificationDetailsModel[]>> =
      await stores.dispatch('notification/getNotificationList', queries)
    if (queries.search !== '') {
      if (pagenation.currentPageNumber == 1) {
        pagenation.data = result.data?.content!
      } else {
        pagenation.data.push(...result.data?.content!)
      }
    } else {
      if (pagenation.currentPageNumber == 1) {
        pagenation.data = result.data?.content!
      } else {
        pagenation.data.push(...result.data?.content!)
      }
    }
    pagenation.currentPageNumber = result.data?.page!
    pagenation.totalPageNumber = result.data?.totalPages!
    pagenation.isLastPage = result.data?.isLastPage
  } catch (error) {
    console.log(error)
  }
}

const loadmore = () => {
  pagenation.currentPageNumber++
}

watch(
  () => ({
    currentPageNumber: pagenation.currentPageNumber,
    searchQuery: pagenation.searchQuery
  }),
  async (newPagenation, oldPagenation) => {
    if (newPagenation.searchQuery !== oldPagenation.searchQuery) {
      queries.page = 1
      queries.search = newPagenation.searchQuery
      await fetchData()
    } else if (newPagenation.currentPageNumber !== oldPagenation.currentPageNumber) {
      queries.page = pagenation.currentPageNumber
      await fetchData()
    }
  }
)
const formatDatetime = (value: Date): string => {
  return format(new Date(value), 'dd/MM/yyyy HH:mm:ss')
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-dropdown class="notification">
    <div class="notification-container">
      <font-awesome-icon class="notification-icon" :icon="['fas', 'bell']" />
    </div>
    <div class="notification-list">
      <div class="scroll-bar">
        <a class="notification-item" v-for="item in pagenation.data">
          <div class="notification-item-img">
            <img :src="image" alt="" />
          </div>
          <div class="notification-item-info">
            <div class="notification-item-info-body">
              <p>{{ item.notification.message }}</p>
            </div>
            <div class="notification-item-info-datetime">
              Ngày: {{ formatDatetime(item.notification.createdAt) }}
            </div>
          </div>
        </a>
      </div>
      <div class="show-notification">
        <button v-if="!pagenation.isLastPage" @click="loadmore()" class="">Xem thêm</button>
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
  top: 42px;
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
  right: 10px;
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
