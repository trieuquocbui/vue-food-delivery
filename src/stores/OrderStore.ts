import type APIResponseModel from '@/models/ApiResponseModel'
import type OrderModel from '@/models/OrderModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import { getOrderList } from '@/services/OrderService'

interface OrdertState {
  orderList: OrderModel[]
}

const OrderStore = {
  namespaced: true,
  state: {
    orderList: []
  } as OrdertState,
  mutations: {
    setOrderList(state: OrdertState, data: OrderModel[]) {
      state.orderList = data
    }
  },
  actions: {
    getOrderList(
      { commit }: any,
      payload: { status: number; paginationInfor: QueryModel }
    ): Promise<APIResponseModel<PagenationResponseModel<OrderModel[]>>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<PagenationResponseModel<OrderModel[]>> = await getOrderList(
            payload.status,
            payload.paginationInfor
          )
          commit('setOrderList', result.data?.content)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default OrderStore
