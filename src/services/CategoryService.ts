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

export { getCategoryList }
