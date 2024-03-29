import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/pinia_main'
import Antd from 'ant-design-vue';
import './assets/main.less'

import 'ant-design-vue/dist/antd.css'; 
const app = createApp(App)
app.use(Antd)
app.use(pinia)
app.use(router)

app.mount('#app')
