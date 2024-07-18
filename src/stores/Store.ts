import auth from '@/stores/AuthStore'
import account from '@/stores/AccountStore'
import category from '@/stores/CategoryStore'
import product from '@/stores/ProductStore'
import order from '@/stores/OrderStore'
import assignment from '@/stores/AssignmentStore'
import { createStore } from 'vuex'

const stores = createStore({
  modules: {
    auth,
    account,
    category,
    product,
    order,
    assignment
  }
})

export default stores
