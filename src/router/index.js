import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import store from "../store/";
import { getItem } from "../plugins/storage";

const Login = () => import("../views/Login.vue");
const Info = () => import("../views/Info.vue");
const Rule = () => import("../views/Rule.vue");
const Game = () => import("../views/Game.vue");
const Rank = () => import("../views/Rank.vue");
const NotFound = () => import("../views/NotFound.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/info",
    name: "Info",
    component: Info,
  },
  {
    path: "/rule",
    name: "Rule",
    component: Rule,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
  {
    path: "/rank",
    name: "Rank",
    component: Rank,
  },
  {
    path: "*",
    redirect: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.state.user;
  if (!to.fullPath.includes("login") && !user._id) {
    const info = getItem("user");
    if (info) store.dispatch("Account", info);
    else next("/login");
  } else next();
});

export default router;
