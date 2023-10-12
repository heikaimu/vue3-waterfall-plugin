/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 13:13:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-21 10:55:03
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import './index.css'
import 'animate.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')
