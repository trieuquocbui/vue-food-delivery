import type ApiResponseModel from '@/models/ApiResponseModel'
import APIClient from './APIClient'
import AssignmentModel from '@/models/AssignmentModel'

const assignedOrderToEmployee = (
  data: AssignmentModel
): Promise<ApiResponseModel<AssignmentModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.post<ApiResponseModel<AssignmentModel>>(
        `/admin/assignment/create`,
        data
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export { assignedOrderToEmployee }
