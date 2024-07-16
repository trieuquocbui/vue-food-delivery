import type ApiResponseModel from '@/models/ApiResponseModel'
import APIClient from './APIClient'
import type QueryModel from '../models/QueryModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type CategoryModel from '@/models/CategoryModel'

const getCategoryList = (
  pagenationInfor: QueryModel
): Promise<ApiResponseModel<PagenationResponseModel<CategoryModel[]>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<ApiResponseModel<PagenationResponseModel<CategoryModel[]>>>(
        `/management/category/list`,
        { params: pagenationInfor }
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const createCategory = (formData: FormData): Promise<ApiResponseModel<CategoryModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.post<ApiResponseModel<CategoryModel>>(
        `/management/category/add`,
        formData
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const getCategory = (categoryId: string): Promise<ApiResponseModel<CategoryModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<ApiResponseModel<CategoryModel>>(
        `/management/category/${categoryId}`
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const updateCategory = (
  id: string,
  formData: FormData
): Promise<ApiResponseModel<CategoryModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.put<ApiResponseModel<CategoryModel>>(
        `/management/category/${id}/edit`,
        formData
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const deleteCategory = (id: string): Promise<ApiResponseModel<string>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.delete<ApiResponseModel<string>>(
        `/management/category/${id}/delete`
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const getAllCategory = (): Promise<ApiResponseModel<CategoryModel[]>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result =
        await APIClient.get<ApiResponseModel<CategoryModel[]>>(`/management/category/all`)
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export {
  getCategoryList,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory
}
