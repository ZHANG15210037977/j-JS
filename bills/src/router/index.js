import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import page from '../components/page'
import home from '../components/page_home';
import bills from '../components/page_bills';
import addBills from '../components/page_addBills';

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
          component: home
        },
        {
          path: '/page_bills',
          name: 'page_bills',
          component: bills
        }, {
          path: '/page_addBills',
          name: 'page_addBills',
          component: addBills
        }
      ]
    }
  ]
})
