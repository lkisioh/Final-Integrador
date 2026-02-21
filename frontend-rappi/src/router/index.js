import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import SelectUserView from '../components/SelectUser.Vue'
import FormUserView from '../views/user/FormUserView.vue'
import FormVendorView from '../views/vendor/FormVendorView.vue'
import FormDriverView from '../views/driver/FormDriverView.vue'
import FormProductView from '@/views/product/FormProductView.vue'

import UserView from '@/views/user/UserView.vue'
import FormAddressView from '@/views/user/FormAddressView.vue'
import EditAddressView from '@/views/user/EditAddressView.vue'
import DriverView from '@/views/driver/DriverView.vue'
import VendorView from '@/views/vendor/VendorView.vue'
import ShopView from '@/views/user/ShopView.vue'
import CartView from '@/views/user/CartView.vue'
import PaymentView from '@/views/user/PaymentView.vue'
import VentasView from '@/views/vendor/VentasView.vue'
import HistorialPedidosView from '@/views/driver/HistorialPedidosView.vue'
import EditProductView from '@/views/product/EditProductView.vue'
import MisPedidosView from '@/views/user/MisPedidosView.vue'
import VendorsView from '@/views/user/VendorsView.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView },
  {
    path: '/SelectUser',
    name: 'select-user',
    component: SelectUserView,
    meta: { requiresAuth: false },
  },
  {
    path: '/newUser',
    name: 'new-user',
    component: FormUserView,
    meta: { requiresAuth: false },
  },
  {
      path: '/user/:uuid',
      name: 'user-details',
      component: UserView,
      meta: { requiresAuth: true, roles: ['final-user'] },
    },
  {
      path: '/edit/user/:uuid',
      name: 'edit-user',
      component: FormUserView,
      meta: { requiresAuth: true, roles: ['final-user'] },
  },
  {
      path: '/user/products',
      name: 'user-products',
      component: UserView,
      meta: { requiresAuth: true, roles: ['final-user'] },
  },
  {
    path:'/user/payment',
      name: 'payment',
      component: PaymentView,
      meta: { requiresAuth: true, roles: ['final-user'] },
    },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView,
    meta: { requiresAuth: true, roles: ['final-user'] },
  },
  {
    path: '/shop/:vendorUuid',
    name: 'shop-vendor',
    component: ShopView,
    meta: { requiresAuth: true, roles: ['final-user'] },
  },
  {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true, roles: ['final-user'] },
    },
  {
    path: '/newVendor',
    name: 'new-vendor',
    component: FormVendorView,
    meta: { requiresAuth: false },
  },
  {
      path : '/user/address/:uuid',
      name : 'form-product',
      component : FormAddressView,
      meta: { requiresAuth: true, roles: ['final-user'] },
    },
    {
      path: '/user/edit-address/:addressUuid',
      name: 'EditAddress',
      component: EditAddressView,
      meta: { requiresAuth: true, roles: ['final-user'] },
    },
  {
    path : '/mis-pedidos/:uuid',
      name : 'mis-pedidos',
      component : MisPedidosView,
      meta: { requiresAuth: true, roles: ['final-user'] },
    },
    {
      path: '/vendors',
      name: 'vendors-list',
      component : VendorsView,
      meta: { requiresAuth: true, roles: ['final-user'] },
    },
  {
    path: '/edit/vendor/:uuid',
    name: 'edit-vendor',
    component: FormVendorView,
    meta: { requiresAuth: true, roles: ['vendor'] },
  },
  {
      path: '/vendor/:uuid',
      name: 'vendor-details',
      component: VendorView,
      meta: { requiresAuth: true, roles: ['vendor'] },
  },
  {
      path : '/products/:vendorUuid',
      name : 'form-products',
      component : FormProductView,
      meta: { requiresAuth: true, roles: ['vendor'] },
    },
     {
      path: '/vendors/:vendorUuid/products/edit/:productUuid',
        name: 'ProductEdit',
        component: EditProductView,
        meta: { requiresAuth: true, roles: ['vendor'] },
     },
     {
      path: '/orders/vendor/:uuid',
      name: 'ventas-view',
      component: VentasView,
      meta: { requiresAuth: true, roles: ['vendor'] },
    },
  {
    path: '/newDriver',
    name: 'new-driver',
    component: FormDriverView,
    meta: { requiresAuth: false },
  },
  {
      path: '/edit/driver/:uuid',
      name: 'edit-driver',
      component: FormDriverView,
      meta: { requiresAuth: true, roles: ['driver'] },
  },
   {
      path: '/orders/:uuid',
      name: 'orders',
      component: DriverView,
      meta: { requiresAuth: true, roles: ['driver'] },
   },
   {
      path:'/driver/historial/:uuid',
      name: 'historial-pedidos',
      component: HistorialPedidosView,
      meta: { requiresAuth: true, roles: ['driver'] },
   },
   {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/ForbiddenView.vue'),
    meta: { requiresAuth: false },
  },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const auth = JSON.parse(localStorage.getItem('auth') || 'null')

  // requiere login
  if (to.meta.requiresAuth && !token) return { name: 'login' }

  // requiere roles
  if (to.meta.roles?.length) {
    if (!auth?.role) return { name: 'login' }
    if (!to.meta.roles.includes(auth.role)) return { name: 'forbidden' }
  }
})

export default router
