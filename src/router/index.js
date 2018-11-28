import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/pages/goods/Goods'
import Seller from '@/pages/seller/Seller'
import Ratings from '@/pages/ratings/Ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    }
  ]
})
