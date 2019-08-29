import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import myRouter from './router'


Vue.config.productionTip = false

//使用VueRouter
Vue.use(VueRouter);

//实例VueRouter
const router = new VueRouter({
  mode: "history",
  //  第一个参数："/"代表根路径 localhost:8080
  //第二个参数：需要渲染的组件
  //当
  routes: myRouter
})

axios.defaults.baseURL = "http://jsonplaceholder.typicode.com";//方便后期调用时不用写一大串地址，直接/posts

//配置Vue原型
Vue.prototype.$axios = axios;

//封装自定义全局指令（无参数）
// Vue.directive("rainbow", {
//   bind(el, binding, vnode) {
//     el.style.color = "#" + Math.random().toString().slice(2, 8);
//   }
// })

//封装自定义全局指令（有参数）
Vue.directive("theme", {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') { //这时候的binding是一个对象
      el.style.maxWidth = "1260px";
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = "560px";
    }

    if (binding.arg == "column") {
      el.style.background = "#ddd";
      el.style.padding = 20 + "px";
    }
  }
})

//自定义全局过滤器
// Vue.filter("to-uppercase", value => {
//   return value.toUpperCase();
// })

//自定义全局过滤器（博客内容：只显示100个左幅剩下的显示...）
Vue.filter("shenglue", value => {
  return value.slice(0, 100) + "...";
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
