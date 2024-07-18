import AccountModel from '@/models/AccountInforModel'
import type APIResponseModel from '@/models/ApiResponseModel'
import type AssignmentModel from '@/models/AssignmentModel'
import { assignedOrderToEmployee } from '@/services/AssignmentService'

const AssignmentStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    assignedOrderToEmployee({ commit }: any, data: AssignmentModel): Promise<APIResponseModel<AssignmentModel>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: APIResponseModel<AssignmentModel> = await assignedOrderToEmployee(data)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  getters: {}
}

export default AssignmentStore
