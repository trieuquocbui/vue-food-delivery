import type APIResponseModel from '@/models/ApiResponseModel'
import type OrderModel from '@/models/OrderModel'
import type QueryModel from '@/models/QueryModel'
import APIClient from './APIClient'
import type PagenationResponseModel from '@/models/PagenationResponseModel'

const getOrderList = (
  status: number,
  paginationInfor: QueryModel
): Promise<APIResponseModel<PagenationResponseModel<OrderModel[]>>> => {
  return new Promise(async (resovle, reject) => {
    try {
      let result = await APIClient.get<APIResponseModel<PagenationResponseModel<OrderModel[]>>>(
        `management/order/list/status/${status}`,
        { params: paginationInfor }
      )
      resovle(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const editlOrder = (orderId: string, status: number): Promise<APIResponseModel<OrderModel>> => {
  return new Promise(async (resovle, reject) => {
    try {
      let result = await APIClient.put<APIResponseModel<OrderModel>>(
        `public/order/${orderId}/edit/status`,
        { status: status }
      )
      resovle(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export { getOrderList, editlOrder }
