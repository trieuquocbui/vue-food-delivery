import type ApiResponseModel from '@/models/ApiResponseModel'
import type NotificationDetailsModel from '@/models/NotificationDetails'
import type NotificationModel from '@/models/NotificationModel'
import type PagenationResponseModel from '@/models/PagenationResponseModel'
import type QueryModel from '@/models/QueryModel'
import { getNotificationList } from '@/services/NotificationService'

interface NotificationState {
  notificationList: NotificationDetailsModel[]
}

const NotificationStore = {
  namespaced: true,
  state: {
    notificationList: []
  } as NotificationState,
  mutations: {
    setNotificationList(state: NotificationState, data: NotificationDetailsModel[]) {
      state.notificationList.unshift(...data)
    }
  },
  actions: {
    getNotificationList(
      { commit }: any,
      payload: QueryModel
    ): Promise<ApiResponseModel<PagenationResponseModel<NotificationDetailsModel[]>>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<PagenationResponseModel<NotificationDetailsModel[]>> =
            await getNotificationList(payload)
          commit('setNotificationList', result.data?.content)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  getters: {
    getNotificationList(state: NotificationState) {
      return state.notificationList
    }
  }
}

export default NotificationStore
