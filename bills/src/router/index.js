import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import page from '../components/page'
import page_home from '../components/page_home';
import page_home_todayBill from '../components/page_home_todayBill';
import page_home_stockMessage from '../components/page_home_stockMessage';
import page_home_goodsMessage from '../components/page_home_goodsMessage';
import page_home_customerMessage from '../components/page_home_customerMessage';

import page_bills from '../components/page_bills';
import page_addBills from '../components/page_addBills';

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/page',
      name: 'page',
      component: page,
      children: [{
          path: '/',
          name: 'page_home',
          component: page_home
        },
        {
          path: '/page_home_todayBill',
          name: 'page_home_todayBill',
          component: page_home_todayBill
        },
        {
          path: '/page_home_stockMessage',
          name: 'page_home_stockMessage',
          component: page_home_stockMessage
        },
        {
          path: '/page_home_goodsMessage',
          name: 'page_home_goodsMessage',
          component: page_home_goodsMessage
        },
        {
          path: '/page_home_customerMessage',
          name: 'page_home_customerMessage',
          component: page_home_customerMessage
        },
        {
          path: '/page_bills',
          name: 'page_bills',
          component: page_bills
        }, {
          path: '/page_addBills',
          name: 'page_addBills',
          component: page_addBills
        }
      ]
    }
  ]
})
