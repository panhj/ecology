import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './sevices'
import '@/assets/index.less'
import '@/assets/resetEle.less'
import {
  Button,
  Input,
  Select,
  MessageBox,
  Loading,
  Notification,
  Message
} from 'element-ui'

Vue.config.productionTip = false

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$http = http;

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)

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
