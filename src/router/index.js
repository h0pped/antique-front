import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import All from "../components/Products/All.vue"
import Commodes from "../components/Products/Commodes.vue"
import Soft from "../components/Products/Soft.vue"
import Tables from "../components/Products/Tables.vue"
import Clocks from "../components/Products/Clocks.vue"
import Another from "../components/Products/Another.vue"
import ProductDescription from "../components/Products/ProductDescription/ProductDescription.vue"

import Login from "../components/Login/Login.vue"
import Logout from "../components/Logout/Logout.vue"

import Cart from "../components/Cart/Cart.vue"
import FormOrder from "../components/Orders/FormOrder/FormOrder.vue"
import InvoicePage from "../components/Orders/InvoicePage/InvoicePage.vue"

import AdminPanel from "../components/AdminPanel/AdminPanel.vue"

export const url = 'http://91.238.103.88';
document.title = 'Antique';
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'All',
    component: All,
    meta: { title: 'Antique - Все товары' }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { title: 'О нас' }

  },
  {
    path: "/commodes",
    name: "Commodes",
    component: Commodes,
    meta: { title: 'Antique - Комоды' }

  },
  {
    path: "/soft",
    name: "Soft",
    component: Soft,
    meta: { title: 'Antique - Мягкая часть' }

  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: { title: 'Antique - Столы' }
  },
  {
    path: "/clocks",
    name: "Clocks",
    component: Clocks,
    meta: { title: 'Antique - Часы' }
  },
  {
    path: "/another",
    name: "Another",
    component: Another,
    meta: { title: 'Antique - Разное' }
  },
  {
    path: "/description/:id",
    name: "Description",
    component: ProductDescription,
    props: true,
    title: 'Antique - Описание товара' 
  },
  {
    path: "/adminPanel",
    name: "AdminPanel",
    component: AdminPanel,
    meta: {
      requiresAuth: true,
       title: 'Antique - Панель администратора'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresVisitor: true,
      title: 'Antique - Авторизация' 
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    props: true,
    meta: { title: 'Antique - Выход' }
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    props: true,
    meta: { title: 'Antique - Корзина' }
  },
  {
    path: "/order",
    name: "FormOrder",
    component: FormOrder,
    props: true,
    meta: { title: 'Antique - Оформить заказ' }
  },
  {
    path: "/invoice",
    name: "InvoicePage",
    component: InvoicePage,
    props: true,
    meta: { title: 'Antique - Статус заказа' }
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  next()
});

export default router