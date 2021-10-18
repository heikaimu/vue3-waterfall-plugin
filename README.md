<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-18 16:22:04
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-18 16:36:54
-->
# Vue3 瀑布流组件
### vue3 waterfall plugin, support PC and mobile, support animate.css. vue3 瀑布流插件，支持PC和移动端，支持animate的所有动画效果 

[在线演示地址](https://heikaimu.github.io/vue-waterfall-plugin/dist/index.html#/)

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
  <div class="card" @click="handleClickCard(item)">
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
  - Bar
  - Bar
  - Bar