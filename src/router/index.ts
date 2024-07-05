import { createRouter, createWebHistory } from 'vue-router'

const NotFoundView = () => import('../views/common/NotFoundView.vue')
const AdminView = () => import('../views/admin/AdminView.vue')
const LoginView = () => import('../views/auth/LoginView.vue')
const HomeView = () => import('../views/admin/HomeView.vue')
const ProductView = () => import('../views/admin/ProductView.vue')
const AccountView = () => import('../views/admin/AccountView.vue')
const FormEmployeeView = () => import('../views/admin/FormEmployeeView.vue')
const EmployeeAccountView = () => import('../views/admin/EmpoyeeAccountView.vue')
const CustomerAccountView = () => import('../views/admin/CustomerAccountView.vue')
const FormProductView = () => import('../views/admin/FormProductView.vue')

const routes = [
  { path: '/', component: LoginView },
  { path: '/login', component: LoginView },
  {
    path: '/admin',
    component: AdminView,
    children: [
      { path: 'home', component: HomeView },
      {
        path: 'product',
        redirect: '/admin/product/list',
        children: [
          { path: 'list', component: ProductView },
          { path: 'add', component: FormProductView }
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
              { path: 'add', component: FormEmployeeView }
            ]
          },
          { path: 'customer', component: CustomerAccountView }
        ]
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
