import { createRouter, createWebHistory } from 'vue-router'

const NotFoundView = () => import('../views/common/NotFoundView.vue')
const AdminView = () => import('../views/admin/AdminView.vue')
const LoginView = () => import('../views/auth/LoginView.vue')
const HomeView = () => import('../views/admin/HomeView.vue')
const ProductView = () => import('../views/admin/ProductView.vue')
const OrdertView = () => import('../views/admin/OrderView.vue')
const AccountView = () => import('../views/admin/AccountView.vue')
const CategoryView = () => import('../views/admin/CateroryView.vue')
const CategoryFormView = () => import('../views/admin/CategoryFormView.vue')
const EmployeeFormView = () => import('../views/admin/EmployeeFormView.vue')
const EmployeeAccountView = () => import('../views/admin/EmpoyeeAccountView.vue')
const CustomerAccountView = () => import('../views/admin/CustomerAccountView.vue')
const ProductFormView = () => import('../views/admin/ProductFormView.vue')
const CategoryListView = () => import('../views/admin/CategoryListView.vue')
const ProductListView = () => import('../views/admin/ProductListView.vue')
const PriceListView = () => import('../views/admin/PriceListView.vue')
const OrderListView = () => import('../views/admin/OrderListView.vue')

const routes = [
  { path: '/', component: LoginView },
  { path: '/login', component: LoginView },
  {
    path: '/admin',
    component: AdminView,
    children: [
      { path: 'home', component: HomeView },
      {
        path: 'category',
        component: CategoryView,
        children: [
          { path: '', component: CategoryListView },
          { path: 'add', component: CategoryFormView },
          { path: ':categoryId/edit', component: CategoryFormView }
        ]
      },
      {
        path: 'product',
        component: ProductView,
        children: [
          { path: '', component: ProductListView },
          { path: 'add', component: ProductFormView },
          { path: 'update/:productId', component: ProductFormView },
          { path: ':productId/price', component: PriceListView }
        ]
      },
      {
        path: 'account',
        component: AccountView,
        redirect: '/admin/account/employee',
        children: [
          {
            path: 'employee',
            children: [
              { path: '', component: EmployeeAccountView },
              { path: 'add', component: EmployeeFormView }
            ]
          },
          { path: 'customer', component: CustomerAccountView }
        ]
      },
      {
        path: 'order',
        component: OrdertView,
        redirect: '/admin/order/waite',
        children: [{ path: ':orderStatus', component: OrderListView }]
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
