import baseUrl from '../helpers/BaseUrlHelper'
import type APIResponse from '@/models/ApiResponse'
import type LoginModel from '@/models/Login'
import header from '@/helpers/HeaderHelper'
import stores from '@/stores/Store'

const login = (data: LoginModel): Promise<APIResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: header('application/json', stores.getters['auth/getRole']),
        body: JSON.stringify(data)
      })
      resolve(response.json())
    } catch (error) {
      reject(error)
    }
  })
}

export { login }
