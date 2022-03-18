/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 13:13:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-18 09:59:36
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './index.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
