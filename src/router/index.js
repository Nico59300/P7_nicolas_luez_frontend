import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connect from '../views/Connect.vue'
import PostsList from '../views/PostList.vue'
import PostDetails from '../views/PostDetails'
import Profile from '../views/Profile'
import UserDetails from '../views/UserDetails'
import MemberList from '../views/MemberList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/connect',
    name: 'Connect',
    component: Connect
  },
  {
    path: '/posts',
    name: 'PostsList',
    component: PostsList
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetails
  },
  {
    path: '/users/',
    name: 'MemberList',
    component: MemberList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
