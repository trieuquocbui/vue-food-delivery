import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false
})

const URL = 'http://localhost:3000'

export const socket = io(URL)

socket.on('connect', () => {
  console.log('connected to server')
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})
