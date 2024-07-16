import type APIResponseModel from '@/models/ApiResponseModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type PriceModel from '@/models/PriceModel'
import type ProductModel from '@/models/ProductModel'
import type QueryModel from '@/models/QueryModel'
import {
  createPrice,
  createProduct,
  deletePrice,
  deleteProduct,
  getPriceListOfProduct,
  getProduct,
  getProductList,
  updateProduct
} from '@/services/ProductService'

interface ProductState {
  productList: ProductModel[]
}

const ProductStore = {
  namespaced: true,
  state: {
    productList: []
  } as ProductState,
  mutations: {
    setProductList(state: ProductState, data: ProductModel[]) {
      state.productList = data
    }
  },
  actions: {
    getProductList(
      { commit }: any,
      payload: QueryModel
    ): Promise<APIResponseModel<PagenationResponseModel<ProductModel[]>>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<PagenationResponseModel<ProductModel[]>> =
            await getProductList(payload)
          commit('setProductList', result.data?.content)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    createProduct({ commit }: any, formDate: FormData): Promise<APIResponseModel<ProductModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<ProductModel> = await createProduct(formDate)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    getProduct({ commit }: any, productId: string): Promise<APIResponseModel<ProductModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<ProductModel> = await getProduct(productId)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    updateProduct(
      { commit }: any,
      payload: { productId: string; formData: FormData }
    ): Promise<APIResponseModel<ProductModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<ProductModel> = await updateProduct(
            payload.productId,
            payload.formData
          )
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    getPriceList(
      { commit }: any,
      payload: { productId: string; pagenationInfor: QueryModel }
    ): Promise<APIResponseModel<PagenationResponseModel<PriceModel[]>>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<PagenationResponseModel<PriceModel[]>> =
            await getPriceListOfProduct(payload.productId, payload.pagenationInfor)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    createPrice({ commit }: any, price: PriceModel): Promise<APIResponseModel<PriceModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<PriceModel> = await createPrice(price)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    deletePrice(
      { commit }: any,
      payload: { productId: string; priceId: string }
    ): Promise<APIResponseModel<string>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<string> = await deletePrice(
            payload.productId,
            payload.priceId
          )
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    deleteProduct({ commit }: any, productId: string): Promise<APIResponseModel<string>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<string> = await deleteProduct(productId)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  getters: {
    getProductList(state: ProductState) {
      return state.productList
    }
  }
}

export default ProductStore
