import Vue from 'vue'
import Router from 'vue-router'
import * as utils from '../util/utils'


Vue.use(Router)

let baseRoutes = {
  routes: [
    {
      path:'/',
      redirect:'/Hello'
    },
    {
      path:'/Login',
      component:(resolve) => require(['../components/Login.vue'], resolve)
    },
    {
      path:'/404',
      component:(resolve) => require(['../components/NotFound.vue'], resolve)
    }
  ]
};

let router = new Router(baseRoutes);

router.beforeEach((to, from, next) => {
  if(to.path ==='/Login'|| utils.session('token')) {
    next();
  }
  else  {
    next({
      path: '/Login'
    });
  }
});

export default router
