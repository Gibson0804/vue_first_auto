import Vue from 'vue'
import Router from 'vue-router'
//import iView from 'iview'
import HelloWorld from '@/components/HelloWorld'
import Hello from '@/components/Hello'
import myIndex from '@/components/myindex'
import auto from '@/components/auto'
import 'iview/dist/styles/iview.css'

Vue.use(Router)
//Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'myIndex',
      component: myIndex
    },
    {
      path: '/auto',
      name: 'auto',
      component: auto
    }
  ]
})
