/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-08 13:13:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 10:23:34
 */
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(ElementPlus);

app.mount('#app');
