import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToDoLists from '../components/ToDolists.vue'
import AddList from '../components/AddList.vue'
import ListDetail from '../components/ToDoList/ListDetail.vue'
import MachineAccount from '../components/MachineAccount.vue'
import MongoDbLists from '../components/MongoDbLists.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[]
  },
  {
    path: '/lists',
    name: 'todolists',
    component: ToDoLists
  },
  {
    path: '/addlist',
    name: 'AddList',
    component: AddList
  },
  {
    path: '/lists/:id',
    name: 'ListDetail',
    component: ListDetail
  },
  {
    path: '/machineaccount',
    name: 'MachineAccount',
    component: MachineAccount
  },
  {
    path: '/mongodbLists',
    name: 'MongoDbLists',
    component: MongoDbLists
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
