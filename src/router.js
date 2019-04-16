import Vue from "vue";
import Router from "vue-router";
import Contents from "./components/Contents";
import Detail from "./components/Detail";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Contents",
      component: Contents
    },
    {
      path: "/:contentsId",
      name: "contentsId",
      component: Detail
    }
  ]
});
