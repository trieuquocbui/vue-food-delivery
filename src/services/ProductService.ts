import type APIResponseModel from '@/models/ApiResponseModel'
import type ProductModel from '@/models/ProductModel'
import APIClient from './APIClient'
import type QueryModel from '@/models/QueryModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type PriceModel from '@/models/PriceModel'

const createProduct = (formData: FormData): Promise<APIResponseModel<ProductModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.post<APIResponseModel<ProductModel>>(
        'management/product/add',
        formData
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const updateProduct = (
  productId: string,
  formData: FormData
): Promise<APIResponseModel<ProductModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.put<APIResponseModel<ProductModel>>(
        `management/product/${productId}/edit`,
        formData
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const deleteProduct = (productId: string): Promise<APIResponseModel<string>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.delete<APIResponseModel<string>>(
        `management/product/${productId}/delete`
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const getProduct = (productId: string): Promise<APIResponseModel<ProductModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<ProductModel>>(
        `management/product/${productId}`
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const getProductList = (
  pagenationInfor: QueryModel
): Promise<APIResponseModel<PagenationResponseModel<ProductModel[]>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<PagenationResponseModel<ProductModel[]>>>(
        `/management/product/list`,
        { params: pagenationInfor }
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const createPrice = (data: PriceModel): Promise<APIResponseModel<PriceModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.post<APIResponseModel<PriceModel>>(
        `/management/product/${data.productId}/new-price/add`,
        data
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const deletePrice = (productId: string, priceId: string): Promise<APIResponseModel<string>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.delete<APIResponseModel<string>>(
        `/management/product/${productId}/new-price/delete/${priceId}`
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const getPriceListOfProduct = (
  productId: string,
  pagenationInfor: QueryModel
): Promise<APIResponseModel<PagenationResponseModel<PriceModel[]>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<PagenationResponseModel<PriceModel[]>>>(
        `/management/product/${productId}/price/list`,
        { params: pagenationInfor }
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductList,
  createPrice,
  deletePrice,
  getPriceListOfProduct
}
