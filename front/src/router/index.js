import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Autenticacion from '@/components/Autenticacion'
import Transferir from '@/components/Transferir'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Autenticacion',
      component: Autenticacion
    },
    {
      path: '/transferir',
      name: 'Transferir',
      component: Transferir
    }
  ]
})
