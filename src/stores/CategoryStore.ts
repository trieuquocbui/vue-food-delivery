import type ApiResponseModel from '@/models/ApiResponseModel'
import type CategoryModel from '@/models/CategoryModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import { getCategoryList } from '@/services/CategoryService'

interface CategoryState {
  categoryList: CategoryModel[]
}

const AccountStore = {
  namespaced: true,
  state: {
    categoryList: []
  } as CategoryState,
  mutations: {},
  actions: {
    getCategoryList(
      { commit }: any,
      payload: QueryModel
    ): Promise<ApiResponseModel<PagenationResponseModel<CategoryModel[]>>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<PagenationResponseModel<CategoryModel[]>> =
            await getCategoryList(payload)
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
