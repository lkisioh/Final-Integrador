import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectUserView from '../components/SelectUser.Vue'
import FormUserView from '../views/user/FormUserView.vue'
import FormVendorView from '../views/vendor/FormVendorView.vue'
import FormDriverView from '../views/driver/FormDriverView.vue'

import UserView from '@/views/user/UserView.vue'
import DriverView from '@/views/driver/DriverView.vue'
import VendorView from '@/views/vendor/VendorView.vue'
import ShopView from '@/views/user/ShopView.vue'

import ProductView from '@/views/product/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/newUser',
      name: 'new-user',
      component: FormUserView,
    },
    {
      path: '/SelectUser',
      name: 'select-user',
      component: SelectUserView,
    },
    {
      path: '/newVendor',
      name: 'new-vendor',
      component: FormVendorView,
    },
    {
      path: '/edit/vendor/:uuid',
      name: 'edit-vendor',
      component: FormVendorView,
    },
    {
      path: '/newDriver',
      name: 'new-driver',
      component: FormDriverView,
    },
    {
      path: '/edit/driver/:uuid',
      name: 'edit-driver',
      component: FormDriverView,
    },
    {
      path: '/user/products',
      name: 'user-products',
      component: UserView,
    },
    {
      path: '/orders/:uuid',
      name: 'orders',
      component: DriverView
    },
    {
      path: '/vendor/:uuid',
      name: 'vendor-details',
      component: VendorView
    },
    {
      path: '/user/:uuid',
      name: 'user-details',
      component: UserView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/product/:uuid',
      name: 'buy-product',
      component: ProductView
    }

  ],
})

export default router
