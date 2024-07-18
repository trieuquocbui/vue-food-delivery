<script setup lang="ts">
import AppHelper from '@/helpers/AppHelper'
import PagenationHelper from '@/helpers/PagenationHelper'
import type AccountModel from '@/models/AccountInforModel'
import type APIResponseModel from '@/models/ApiResponseModel'
import type PagenationModel from '@/models/PagenationModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import stores from '@/stores/Store'
import { onMounted, reactive, watch } from 'vue'

const emit = defineEmits(['selected-employee'])

const pagenation = reactive<PagenationModel<AccountModel[]>>({
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
  search: pagenation.searchQuery,
  sortField: pagenation.sortField,
  sortOrder: pagenation.sortOrder
})

const image = AppHelper.imagePath

const fetchData = async () => {
  try {
    const result: APIResponseModel<PagenationResponseModel<AccountModel[]>> = await stores.dispatch(
      'account/getEmployeAccountStatusList',
      queries
    )
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

onMounted(() => {
  fetchData()
})
</script>
<template>
  <div class="assign-job">
    <div class="employee-search">
      <form class="employee-search-form">
        <input
          v-model="pagenation.searchQuery"
          class="employee-search-form-input"
          type="search"
          placeholder="Tìm nhân viên theo tên"
        />
      </form>
    </div>
    <div class="employee-list">
      <div class="employee-list-item" v-for="account in pagenation.data">
        <div class="l-2">
          <img :src="image + account.thumbnail" alt="" class="employee-list-item-image" />
        </div>
        <div class="l-7 employee-list-item-name">{{ account.user.fullName }}</div>
        <div class="l-3">
          <div class="operation row">
            <button
              class="l-12 btn-assign-job"
              title="Phân công"
              @click="emit('selected-employee', account.user._id)"
            >
              Phân công
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="employee-load-more">
    <button
      class="btn-load-more"
      v-if="!pagenation.isLastPage"
      @click="pagenation.currentPageNumber++"
    >
      Tải thêm
    </button>
  </div>
</template>

<style scoped>
.employee-load-more {
  height: 32px;
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
  width: 354px;
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
  margin: 4px 0px;
  display: flex;
  align-items: center;
  text-align: start;
  width: 350px;
}

.employee-list-item-image {
  width: 50px;
  height: 50px;
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
