import auth from '@/stores/AuthStore'
import account from '@/stores/AccountStore'
import category from '@/stores/CategoryStore'
import { createStore } from 'vuex'

const stores = createStore({
  modules: {
    auth,
    account,
    category
  }
})

export default stores
