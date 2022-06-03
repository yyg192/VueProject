import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../components/UserLogin.vue'
import UserHome from '../components/UserHome.vue'

Vue.use(VueRouter)
// 当用户访问/login地址时就访问Login组件
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: UserLogin },
    { path: '/home', component: UserHome }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径
  // from 代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next() 放行 next('/login) 强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) { return next('/login') }
  next()
})

export default router // 暴露路由对象，一个模块是一个独立的文件，
// 文件内部所有变量，外部无法获取，除非你用export关键字输出该变量
// export default的意思就是为router起一个default的名字，
// 外部import的时候可以不用管他的名字是什么直接import
