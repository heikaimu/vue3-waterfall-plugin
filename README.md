<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-18 16:22:04
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-18 16:55:39
-->
# Vue3 瀑布流组件
### vue3 waterfall plugin, support PC and mobile, support animate.css. vue3 瀑布流插件，支持PC和移动端，支持animate的所有动画效果 

[在线演示地址](https://heikaimu.github.io/vue-waterfall-plugin/dist/index.html#/)

[vue2版本](https://github.com/heikaimu/vue-waterfall-plugin)

### 本地浏览

下载项目

```
yarn
```
or
```
npm i
```

```
npm run dev
```

### 安装

```
yarn add vue-waterfall-plugin-next
```

### 引入

```
import VueWaterfallPluginNext from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
```

### 使用

```template
 <VueWaterfallPluginNext :list="list">
  <template #item="{ item, url, itemWidth }">
    <div class="card" @click="handleClickCard(item)">
      <img :src="url" />
      <p class="text">
        {{item}} 包含当前卡片所有信息
        {{url}} 当前卡片的图片资源
        {{itemWidth}} 当前卡片宽度
      </p>
    </div>
  </template>
</VueWaterfallPluginNext>
```

### 全配置参数，配合图片尺寸信息使用
```template
<VueWaterfallPluginNext
  :list="list"
  :gutter="gutter"
  :hasAroundGutter="hasAroundGutter"
  :width="width"
  :breakpoints="breakpoints"
  :imgSelector="imgSelector"
  :backgroundColor="backgroundColor"
  :animationEffect="animationEffect"
  :animationDuration="animationDuration"
  :animationDelay="animationDelay"
>
  <template #item="{ item, url, itemWidth }">
  <div class="card">
    <img
      :src="url"
      alt=""
      :width="itemWidth"
      :height="(itemWidth * item.height) / item.width"
      :style="{ backgroundColor: item.backgroundColor }"
     />
    <p class="text">{{ item.name }}</p>
  </div>
  </template>
</VueWaterfallPluginNext>
```

### 相比vue2版本做的优化
  - 图片加载完成后会自动更新排版，无需调用refresh函数
  - 容器宽度变化后会自动更新排版，无需调用refresh函数
  - 使用resizeObserver API 代替 window resize，性能开销更小


### 参数
| Name             | Type    | Default   | Description           |
| ---------------- | ------- | --------- | --------------------- |
| list             | Array   | []        | 列表数据            |
| imgSelector      | String  | src       | 图片字段选择器，主要用与监控图片加载完成触发重新排版，如果层级较深，使用 xxx.xxx.xxx 方式 |
| width            | Number  | 200       | 卡片在PC上的宽度 |
| breakpoints      | Object  |breakpoints| 自定义行显示个数，主要用于对移动端的适配 |
| gutter           | Number  | 10        | 卡片之间的间隙 |
| hasAroundGutter  | Boolean | true      | 容器四周是否有gutter边距 |
| animationEffect  | String  | fadeIn    | 卡片入场动画，默认只有fadeIn，引入animation.css后可使用其他动画 |
| animationDuration| Number  | 1000      | 动画执行时间（单位毫秒） |
| animationDelay   | Number  | 300       | 动画延迟（单位毫秒） |
| backgroundColor  | String  | #fff      | 背景颜色 |
```
breakpoints: {
  1200: { //当屏幕宽度小于等于1200
    rowPerView: 4,
  },
  800: { //当屏幕宽度小于等于800
    rowPerView: 3,
  },
  500: { //当屏幕宽度小于等于500
    rowPerView: 2,
  }
}
```
