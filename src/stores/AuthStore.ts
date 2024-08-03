import type AccountModel from '@/models/AccountInforModel'
import type ApiResponseModel from '@/models/ApiResponseModel'
import type LoginModel from '@/models/LoginModel'
import { login, registerEmployeeAccount } from '@/services/AuthService'

interface AuthState {
  authToken: string
  message: string
}
const AuthStore = {
  namespaced: true,
  state: {
    authToken: ''
  } as AuthState,
  mutations: {
    setToken(state: AuthState, token: string) {
      state.authToken = token
      localStorage.setItem('authToken', token)
    },
    logout(state: AuthState) {
      ;(state.authToken = ''), (state.message = '')
      localStorage.removeItem('authToken')
    }
  },
  actions: {
    login(
      { commit }: any,
      loginModel: LoginModel
    ): Promise<ApiResponseModel<{ account: AccountModel; token: string }>> {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<{ account: AccountModel; token: string }> =
            await login(loginModel)
          commit('setToken', result.data?.token)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },

    logout({ commit }: any) {
      commit('logout')
    },

    registerEmployeeAccount({ commit }: any, formData: FormData) {
      return new Promise(async (resolve, reject) => {
        try {
          let result: ApiResponseModel<AccountModel> = await registerEmployeeAccount(formData)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  getters: {
    getToken: (state: AuthState) => {
      return state.authToken
    },

    getMessage: (state: AuthState) => {
      return state.message
    }
  }
}

export default AuthStore
