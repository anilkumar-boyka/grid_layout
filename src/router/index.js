import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import bar from '@/components/barChart'
// import pie from '@/components/pieChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path:'/bar',
    //   name : 'bar',
    //   component : bar
    // },
    // {
    //   path:'/pie',
    //   name : 'pie',
    //   component : pie
    // }
  ]
})
