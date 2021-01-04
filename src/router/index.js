import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import store from '../store'
function checkEnter(path, next) {
  // if (store.state.userlist.menus_url.includes(path)) {
  //   next()
  // } else {
  //   next("/")
  // }
  next()
}

export let urlAggregate = [

  {
    path: "cate",
    name: "商品分类",
    component: () => import("../pages/cate/cate.vue"),
    beforeEnter(to, from, next) {
      checkEnter("/cate", next)
    }
  },
  {
    path: "banner",
    name: "轮播图管理",
    component: () => import("../pages/banner/banner.vue"),
    beforeEnter(to, from, next) {
      checkEnter("/banner", next)
    }
  },
  {
    path: "goods",
    name: "商品管理",
    component: () => import("../pages/goods/goods.vue"),
    beforeEnter(to, from, next) {
      checkEnter("/goods", next)
    }
  },
  {
    path: "manage",
    name: "管理员管理",
    component: () => import('../pages/manage/manage.vue'),
    beforeEnter(to, from, next) {
      checkEnter("/manage", next)
    }
  },
  {
    path: "member",
    name: "会员管理",
    component: () => import('../pages/member/member.vue'),
    beforeEnter(to, from, next) {
      checkEnter("/member", next)
    }
  },
  {
    path: "menu",
    name: "菜单管理",
    component: () => import('../pages/menu/menu.vue'),
    beforeEnter(to, from, next) {
      checkEnter("/menu", next)
    }
  },
  {
    path: "role",
    name: "角色管理",
    component: () => import('../pages/role/role.vue'),
    beforeEnter(to, from, next) {
      checkEnter("/role", next)
    }
  },
  {
    path: "seckill",
    name: "秒杀活动",
    component: () => import('../pages/seckill/seckill.vue'),
    beforeEnter(to, from, next) {
      checkEnter("/seckill", next)
    }
  },
  {
    path: "specs",
    name: "商品规格",
    component: () => import('../pages/specs/specs.vue'),
    beforeEnter(to, from, next) {
      checkEnter("/specs", next)
    }
  }
]


let router = new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: () => import("../pages/login/login.vue")
    },
    {
      path: '/',
      name: "大首页",
      component: () => import("../pages/index/index.vue"),
      children: [
        {
          path: "",
          name: "首页",
          component: () => import("../pages/home/home.vue"),
        },
        // 二级路由
        ...urlAggregate
      ]

    }
  ]
})
// 登陆拦截

// router.beforeEach((to, from, next) => {
//   // 如果是去登陆
//   if (to.path == '/login') {
//     next();
//     return
//   }
//   // 如果不是去登录，判断是否登陆过，登录了就next
//   if (store.state.userlist.id) {
//     next();
//     return
//   }
//   // 否则
//   next('/login')
// })

export default router
