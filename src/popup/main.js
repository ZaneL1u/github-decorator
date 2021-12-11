import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import Storage from 'vue-ls';
import "element-ui/lib/theme-chalk/index.css";

const options = {
  namespace: 'gd__',
  name: 'ls',
  storage: 'local',
};

Vue.use(Storage, options);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});
