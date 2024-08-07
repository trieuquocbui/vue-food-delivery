<script setup lang="ts">
import Pagenation from '@/components/Pagenation.vue'
import type PagenationModel from '@/models/PagenationModel'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import PagenationHelper from '@/helpers/PagenationHelper'
import stores from '@/stores/Store'
import AccountModel from '@/models/AccountInforModel'
import type QueryModel from '@/models/QueryModel'
import APIResponseModel from '@/models/ApiResponseModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import { useRoute } from 'vue-router'
import Modal from '../common/Modal.vue'
import { useModal } from '@/composables/ModalComposable'
import AccountStatus from '@/helpers/AccountStatus'
import UserDetail from '@/components/admin/UserDetail.vue'
import { socket, state } from '@/socket'

const route = useRoute()
const modal = useModal()

const pagenation = reactive<PagenationModel<AccountModel[]>>({
  currentPageNumber: route.query.page
    ? Number(route.query.page)
    : PagenationHelper.CURRENT_PAGE_NUMBER,
  offset: route.query.limit ? Number(route.query.limit) : PagenationHelper.OFFSET,
  totalPageNumber: 0,
  searchQuery: route.query.search ? String(route.query.search) : PagenationHelper.SEARCH_QUERY,
  sortField: route.query.sortField ? String(route.query.sortField) : PagenationHelper.SORT_FIELD,
  sortOrder: route.query.sortOrder ? String(route.query.sortOrder) : PagenationHelper.SORT_ORDER,
  data: []
})

const queries = reactive<QueryModel>({
  page: pagenation.currentPageNumber,
  limit: pagenation.offset,
  search: pagenation.searchQuery,
  sortField: pagenation.sortField,
  sortOrder: pagenation.sortOrder
})

let account = reactive<AccountModel>(new AccountModel())

const message = ref<string>('')

const showAddition = ref<boolean>(true)

const fetchData = async () => {
  const roleName = String(route.params.roleName)
  if (roleName == 'user') {
    showAddition.value = false
  } else {
    showAddition.value = true
  }
  try {
    const result: APIResponseModel<PagenationResponseModel<AccountModel[]>> = await stores.dispatch(
      'account/getAccountList',
      {
        pagenationInfor: queries,
        roleName: roleName.toUpperCase()
      }
    )
    pagenation.data = result.data?.content || []
    pagenation.totalPageNumber = result.data?.totalPages || 0
    pagenation.currentPageNumber = result.data?.page || pagenation.currentPageNumber
  } catch (error) {
    console.log(error)
  }
}

const selectedPage = (page: number) => {
  pagenation.currentPageNumber = page
}

const selectedAcction = async (action: boolean) => {
  modal.close()
  if (action) {
    if (account.status == AccountStatus.CLOSE) {
      account.status = AccountStatus.ONLINE
    } else if (account.status != AccountStatus.CLOSE) {
      account.status = AccountStatus.CLOSE
    }
    try {
      const result: APIResponseModel<AccountModel> = await stores.dispatch(
        'account/changeAccountStatus',
        account
      )
      modal.open('Thông báo', false, undefined, 'message')
      message.value = result.message
      pagenation.data.find((account) => account.username == result.data?.username)!.status =
        result.data?.status
    } catch (error: any) {
      modal.open('Thông báo', false, undefined, 'message')
      message.value = error.message
    }
  }
}

const showModal = (value: AccountModel, action: string) => {
  account = value
  if (action == 'get') {
    modal.open('Thông tin nhân viên', false, undefined, 'data')
  } else {
    modal.open('Thông báo', true, undefined, 'message')
    if (action == 'remove') {
      message.value = 'Bạn muốn khoá tài khoản nhân viên này!'
    } else {
      message.value = 'Bạn muốn mở khoá tài khoản nhân viên này!'
    }
  }
}

const gender = (value: number): string => {
  return value ? 'Nữ' : 'Nam'
}

const status = (value: number): string => {
  if (value == AccountStatus.ONLINE) {
    return 'Hoạt động'
  } else if (value == AccountStatus.CLOSE) {
    return 'Bị khoá'
  } else {
    return 'Không hoạt động'
  }
}

watch(
  () => ({
    currentPageNumber: pagenation.currentPageNumber,
    searchQuery: pagenation.searchQuery
  }),
  async (newPagenation, oldPagenation) => {
    if (
      newPagenation.currentPageNumber !== oldPagenation.currentPageNumber ||
      newPagenation.searchQuery !== oldPagenation.searchQuery
    ) {
      queries.page = pagenation.currentPageNumber
      queries.search = pagenation.searchQuery
      await fetchData()
    }
  }
)

watch(
  () => route.params.roleName,
  async (newStatus, oldStatus) => {
    if (newStatus !== oldStatus) {
      await fetchData()
    }
  }
)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="content-main">
    <div class="content-main-header">
      <div class="content-main-add" v-if="showAddition">
        <h3 class="content-main-add-title">Thêm nhân viên:</h3>
        <div class="operation">
          <button
            @click="$router.push('/admin/account/employee/add')"
            class="ml-4 btn-operation btn-add"
            title="Thêm tài khoản"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
        </div>
      </div>
      <form class="form" action="">
        <div class="form-group">
          <input
            v-model="pagenation.searchQuery"
            class="form-group-input"
            type="search"
            placeholder="Tìm kiếm..."
          />
        </div>
      </form>
    </div>
    <div class="content-main-list">
      <div class="container-list">
        <div class="container-heading-list row">
          <div class="l-2">Tên tài khoản</div>
          <div class="l-3">Họ và tên</div>
          <div class="l-2">Số điện thoại</div>
          <div class="l-2">Giới tính</div>
          <div class="l-2">Trạng thái</div>
          <div class="l-1">Thao tác</div>
        </div>
        <div class="container-content-list">
          <div
            class="container-content-item"
            v-for="account in pagenation.data"
            :key="account.username"
          >
            <div class="l-2">{{ account.username }}</div>
            <div class="l-3">{{ account.user.fullName }}</div>
            <div class="l-2">{{ account.user.phoneNumber }}</div>
            <div class="l-2">{{ gender(account.user.gender!) }}</div>
            <div class="l-2">{{ status(account.status!) }}</div>
            <div class="l-1">
              <div class="operation row-offset-4-wrap">
                <div class="col-offset-4 l-4">
                  <button
                    class="btn-operation btn-infor"
                    title="Thông tin"
                    @click="showModal(account, 'get')"
                  >
                    <font-awesome-icon :icon="['fas', 'info']" />
                  </button>
                </div>
                <div class="col-offset-4 l-4">
                  <button
                    v-if="account.status == AccountStatus.CLOSE"
                    class="btn-operation btn-remove"
                    title="Mở tài khoản nhân viên"
                    @click="showModal(account, 'put')"
                  >
                    <font-awesome-icon :icon="['fas', 'lock-open']" />
                  </button>
                  <button
                    v-else-if="account.status != AccountStatus.CLOSE"
                    class="btn-operation btn-remove"
                    title="Khoá tài khoản nhân viên"
                    @click="showModal(account, 'remove')"
                  >
                    <font-awesome-icon :icon="['fas', 'lock']" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagenation
      :current-page-number="pagenation.currentPageNumber"
      :offset="pagenation.offset"
      :total-page-number="pagenation.totalPageNumber"
      @selected-page="selectedPage"
    ></Pagenation>
  </div>

  <Modal v-bind="modal.data" @selected-acction="selectedAcction">
    <template #content v-if="modal.data.type == 'message'">
      <p>{{ message }}</p>
    </template>
    <template #content v-if="modal.data.type == 'data'">
      <UserDetail :account="account"></UserDetail>
    </template>
  </Modal>
</template>
