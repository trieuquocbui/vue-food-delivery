import auth from '@/stores/AuthStore'
import { createStore } from 'vuex'

const stores = createStore({
  modules: {
    auth
  }
})

export default stores
