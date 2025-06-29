import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import axios from "axios";
import nprogress from "nprogress";
import ToastPlugin from "vue-toast-notification";
import "../node_modules/nprogress/nprogress.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Antd from 'ant-design-vue';

const vuetify = createVuetify({
  components,
  directives,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    nprogress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    nprogress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// router.beforeEach((to,from,next)=>{
//     nprogress.start();
// })

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(ToastPlugin, {
  position: "top right",
});

app.use(router);
app.use(vuetify);
app.use(Antd);

app.mount("#app");
