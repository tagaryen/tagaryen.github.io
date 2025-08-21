import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: "Home",
    component: () => import('@/components/Home')
  },
  {
    path: '/edit',
    name: "Edit",
    component: () => import('@/components/MdEditor')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
