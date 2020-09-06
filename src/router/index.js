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

import AdminPanel from "../components/AdminPanel/AdminPanel.vue"

export const url = 'http://91.238.103.88';

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'All',
    component: All
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/commodes",
    name: "Commodes",
    component: Commodes
  },
  {
    path: "/soft",
    name: "Soft",
    component: Soft
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables
  },
  {
    path: "/clocks",
    name: "Clocks",
    component: Clocks
  },
  {
    path: "/another",
    name: "Another",
    component: Another
  },
  {
    path:"/description/:id",
    name:"Description",
    component:ProductDescription,
    props: true
  },
  {
    path:"/adminPanel",
    name:"AdminPanel",
    component:AdminPanel,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:"/login",
    name:"Login",
    component:Login,
    props: true,
    meta:{
      requiresVisitor:true
    }
  },
  {
    path:"/logout",
    name:"Logout",
    component:Logout,
    props: true
  }

  ]

const router = new VueRouter({
  routes
})

export default router