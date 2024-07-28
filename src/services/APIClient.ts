import baseUrl from '@/helpers/BaseUrlHelper'
import { getRole } from '@/helpers/DecodeHelper'
import axios from 'axios'

const APIClient = axios.create({
  baseURL: baseUrl,
  timeout: 30000
})

APIClient.interceptors.request.use((config) => {
  let token: string = localStorage.getItem('authToken')!
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

APIClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

export default APIClient
