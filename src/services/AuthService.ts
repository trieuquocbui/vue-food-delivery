import type LoginModel from '@/models/LoginModel'
import type APIResponse from '@/models/ApiResponseModel'
import APIClient from './APIClient'
import type AccountModel from '@/models/AccountInforModel'

const login = (data: LoginModel): Promise<APIResponse<string>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.post<APIResponse<string>>('/auth/login', data)
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

const registerEmployeeAccount = (formData: FormData): Promise<APIResponse<AccountModel>> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await APIClient.post<APIResponse<AccountModel>>(
        '/management/account/register/employee',
        formData
      )
      resolve(result.data)
    } catch (error) {
      reject(error)
    }
  })
}

export { login, registerEmployeeAccount }
