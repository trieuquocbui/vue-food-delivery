import type ApiResponseModel from '@/models/ApiResponseModel'
import APIClient from './APIClient'
import type QueryModel from '../models/QueryModel'
import type AccountModel from '@/models/AccountInforModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'

const getAccountList = (
  pagenationInfor: QueryModel,
  roloId: string
): Promise<ApiResponseModel<PagenationResponseModel<AccountModel[]>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<ApiResponseModel<PagenationResponseModel<AccountModel[]>>>(
        `/management/account/list/${roloId}`,
        { params: pagenationInfor }
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const changeAccountStatus = (account: AccountModel): Promise<ApiResponseModel<AccountModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.put<ApiResponseModel<AccountModel>>(
        `/management/account/${account.username}`,
        { status: account.status }
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export { getAccountList, changeAccountStatus }
