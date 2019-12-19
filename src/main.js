import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/index.less'
import '@/assets/resetEle.less'
import {
  Menu,
  MenuItem,
  Input,
  MessageBox,
  Loading,
  Notification,
  Message
} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
