import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import FaultsView from '@/views/FaultsView.vue';
import FaultsMainView from '@/views/FaultsMainView.vue';
import FaultsTableView from '@/views/FaultsTableView.vue';
import TroubleshootView from '@/views/TroubleshootView.vue';
import SelectionView from '@/views/SelectionView.vue';
import ResultsView from '@/views/ResultsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/faults',
      component: FaultsView,
      children: [
        {
          path: '',
          component: FaultsMainView,
        },
        {
          path: 'table',
          component: FaultsTableView,
        }
      ]
    },
    {
      path: '/troubleshoot',
      component: TroubleshootView
    },
    {
      path: '/selection',
      component: SelectionView
    },
    {
      path: '/results',
      component: ResultsView,
      beforeEnter: (to, from, next) => {
        const results = sessionStorage.getItem('results');
        if(!results) {
          next('/troubleshoot');
        } else {
          next();
        }
      }
    }
  ]
})




export default router
