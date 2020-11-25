import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
