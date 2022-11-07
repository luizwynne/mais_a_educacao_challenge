import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentsPage from '../pages/StudentsPage.vue'
import NewStudentPage from '../pages/NewStudentPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/', 
    name: 'StudentsPage', 
    component: StudentsPage
  },
  {
    path:'/cadastro', 
    name: 'NewStudentPage', 
    component: NewStudentPage
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
