import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { normalizeProjectName } from '@/utils'
import { getYears } from '@/utils'
const yearsList = getYears()
const projectList = normalizeProjectName()
import worksData from '@/data.json'
const works = worksData
let worksList = []
works.forEach((work) => worksList.push(work.urlSlug))

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
        component: () => import('../views/WorksView.vue'),
        beforeEnter: (to) => {
          const isExistingYear = yearsList.find((filter) => filter === to.params.filter)
          const isExistingName = projectList.find(
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
