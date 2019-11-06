import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//框架
const index = ()=> import("@/layout/Index")

//课程介绍
const introduction = ()=> import("@/layout/Introduction")

//课程详情
const details = ()=> import("@/layout/Details")

//教学课件
const courseware = ()=> import("@/layout/Courseware")

//教学课件
const video = ()=> import("@/layout/Video")

//教学课件
const message = ()=> import("@/layout/Message")


const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: index,
      redirect: '/introduction',
      children:[
        {
          path: "introduction",
          meta:{
            title: "课程介绍"
          },
          component: introduction
        },
        {
          path: "details",
          meta:{
            title: "课程详情"
          },
          component: details
        },
        {
          path: '/courseware',
          meta:{
            title: "教学课件"
          },
          component: courseware
        },
        {
          path: '/video',
          meta:{
            title: "视频资料"
          },
          component: video
        },
        {
          path: '/message',
          meta:{
            title: "留言板"
          },
          component: message
        }
      ]
    }
  ]
})

// 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于等待中。
router.beforeEach((to, from, next) => {
  // 自动化修改页面标签的 title
  document.title = to.meta.title;
  next()
});

export default router;
