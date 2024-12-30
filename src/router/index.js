import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PacientesView from '../views/pacientes/ListPacienteView'
import DoctoresView from '../views/doctores/ListDoctorView'
import CitasView from '../views/citas/ListCitaView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/citas',
    name: 'citas',
    component: CitasView
  },
  {
    path: '/doctores',
    name: 'doctores',
    component: DoctoresView
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacientesView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
