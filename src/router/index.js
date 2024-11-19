import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const yearsList = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
const namesList = ['test']
const worksList = ['firstwork', 'worktest']

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/works',
    children: [
      { path: '', name: 'works', component: () => import('../views/WorksView.vue') },
      {
        path: ':worktitle',
        component: () => import('../views/ArtWorkView.vue'),
        beforeEnter: (to) => {
          const isExistingWork = worksList.find(
            (title) => title.localeCompare(to.params.worktitle) === 0
          )
          // reject the navigation
          if (!isExistingWork) return { name: 'NotFound' }
        }
      },
      { path: 'explorer', redirect: '/works' },
      {
        path: 'explorer/:filter',
        component: () => import('../views/FilterView.vue'),
        beforeEnter: (to) => {
          const isExistingYear = yearsList.find((filter) => filter === parseInt(to.params.filter))
          const isExistingName = namesList.find(
            (filter) => filter.localeCompare(to.params.filter) === 0
          )
          // reject the navigation
          if (!isExistingYear && !isExistingName) return { name: 'NotFound' }
        }
      },
      {
        path: 'explorer/:filter/:worktitle',
        component: () => import('../views/ArtWorkView.vue'),
        beforeEnter: (to) => {
          const isExistingWork = worksList.find(
            (title) => title.localeCompare(to.params.worktitle) === 0
          )
          // Not really useful yet, improve or delete this guard
          if (!isExistingWork) return { name: 'NotFound' }
        }
      }
    ]
  },
  {
    path: '/infos',
    name: 'infos',
    component: () => import('../views/InfoView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
