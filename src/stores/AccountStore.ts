import AccountModel from '@/models/AccountInforModel'
import type ApiResponseModel from '@/models/ApiResponseModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import { changeAccountStatus, getAccountList } from '@/services/AccountService'

interface AccountState {
  accountList: AccountModel[]
}

const AccountStore = {
  namespaced: true,
  state: {
    accountList: []
  } as AccountState,
  mutations: {},
  actions: {
    getAccountList(
      { commit }: any,
      payload: { pagenationInfor: QueryModel; roleId: string }
    ): Promise<ApiResponseModel<PagenationResponseModel<AccountModel[]>>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<PagenationResponseModel<AccountModel[]>> =
            await getAccountList(payload.pagenationInfor, payload.roleId)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    changeAccountStatus(
      { commit }: any,
      account: AccountModel
    ): Promise<ApiResponseModel<AccountModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          console.log(account)
          let result: ApiResponseModel<AccountModel> = await changeAccountStatus(account)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  getters: {}
}

export default AccountStore
