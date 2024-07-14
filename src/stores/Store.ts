import auth from '@/stores/AuthStore'
import account from '@/stores/AccountStore'
import { createStore } from 'vuex'

const stores = createStore({
  modules: {
    auth,
    account
  }
})

export default stores
