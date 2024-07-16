import type ApiResponseModel from '@/models/ApiResponseModel'
import type CategoryModel from '@/models/CategoryModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  getCategoryList,
  updateCategory
} from '@/services/CategoryService'

interface CategoryState {
  categoryList: CategoryModel[]
}

const AccountStore = {
  namespaced: true,
  state: {
    categoryList: []
  } as CategoryState,
  mutations: {
    setCategoryList(state: CategoryState, data: CategoryModel[]) {
      state.categoryList = data
    }
  },
  actions: {
    getCategoryList(
      { commit }: any,
      payload: QueryModel
    ): Promise<ApiResponseModel<PagenationResponseModel<CategoryModel[]>>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<PagenationResponseModel<CategoryModel[]>> =
            await getCategoryList(payload)
          commit('setCategoryList', result.data?.content)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    updateCategory(
      { commit }: any,
      payload: { id: string; formData: FormData }
    ): Promise<ApiResponseModel<CategoryModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<CategoryModel> = await updateCategory(
            payload.id,
            payload.formData
          )
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    createCategory({ commit }: any, formData: FormData): Promise<ApiResponseModel<CategoryModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<CategoryModel> = await createCategory(formData)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    deleteCategory({ commit }: any, id: string): Promise<ApiResponseModel<string>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<string> = await deleteCategory(id)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    getCategory({ commit }: any, id: string): Promise<ApiResponseModel<CategoryModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<CategoryModel> = await getCategory(id)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    getAll({ commit }: any): Promise<ApiResponseModel<CategoryModel[]>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<CategoryModel[]> = await getAllCategory()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  getters: {
    getCategoryList(state: CategoryState) {
      return state.categoryList
    }
  }
}

export default AccountStore
