import type ApiResponseModel from '@/models/ApiResponseModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import APIClient from './APIClient'
import type NotificationDetailsModel from '@/models/NotificationDetails'

const getNotificationList = (
  pagenationInfor: QueryModel
): Promise<ApiResponseModel<PagenationResponseModel<NotificationDetailsModel[]>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.get<
        ApiResponseModel<PagenationResponseModel<NotificationDetailsModel[]>>
      >(`/public/notification/list`, { params: pagenationInfor })
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export { getNotificationList }
