<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-18 16:22:04
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-09-21 09:29:02
-->

# Vue3 瀑布流组件

vue3 瀑布流插件，支持 PC 和移动端，支持 animate 的所有动画效果，支持图片懒加载

[在线演示地址](https://heikaimu.github.io/vue3-waterfall-plugin/#/page-a)

[vue2 版本](https://github.com/heikaimu/vue-waterfall-plugin)

#### 安装

```bash
npm install vue-waterfall-plugin-next
```

#### 使用

```javascript
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
```

```html
<Waterfall :list="list">
  <template #item="{ item, url, index }">
    <div class="card">
      <LazyImg :url="url" />
      <p class="text">这是具体内容</p>
    </div>
  </template>
</Waterfall>
```

```javascript
data: {
  list: [
    {
      src: "xxxx.jpg",
      ...
    }
    ...
  ]
}

```
作用域插槽返回了3个字段：
`item` 原始数据, `url` 图片资源, `index` 卡片索引 

#### `Props` 参数
| 参数名              | 类型    | 默认值     | 描述                                                                               |
| ----------------- | ------- | ----------- | ----------------------------------------------------------------------------------------- |
| `list`              | `Array`   | []          | 列表数据 |
| `rowKey`           | `String`  | `id`          | 数据唯一的字段，比如列表里面的`id`, 如果要删除卡片，该字段为必填 |
| `imgSelector`       | `String`  | `src`         | 图片字段选择器，如果层级较深，使用 `xxx.xxx.xxx` 方式 |
| `width`             | `Number`  | `200`         | 卡片在 PC 上的宽度, 与breakpoints一样可以确定卡片的宽度以及每行个数, 但**breakpoints优先级高于width** |
| `breakpoints`       | `Object`  | {<br>1200:{rowPerView:3},<br>800:{rowPerView:2},<br>500:{rowPerView:1}<br>} | 类似css的@media, 定义不同容器宽度下每行卡片个数，主要用于对移动端的适配 |
| `gutter`            | `Number`  | `10`          | 卡片之间的间隙 |
| `hasAroundGutter`   | `Boolean` | `true`        | 容器四周是否有 `gutter` 边距 |
| `animationPrefix`   | `String`  | `animate__animated` | `animate.css` 的动画绑定 `className`，默认的是 `4.x.x` 版本，如果想使用老版本，只需要改成 `animated` 即可 |
| `animationEffect`   | `String`  | `fadeIn`      | 卡片入场动画，默认只有 `fadeIn`，引入 `animation.css` 后可使用其他动画 |
| `animationDuration` | `Number`  | `1000`        | 动画执行时间（单位毫秒）|
| `animationDelay`    | `Number`  | `300`         | 动画延迟（单位毫秒）|
| `backgroundColor`   | `String`  | `#ffffff`     | 背景颜色 |
| `loadProps`         | `Object`  | `loadProps`   | 加载的图片和失败的图片 |
| `lazyload`          | `Boolean` | `true`        | 是否开启懒加载 |
| `crossOrigin`       | `Boolean` | `true`        | 图片加载是否开启跨域 |
| `delay`             | `Number`  | `300`         | 布局刷新的防抖时间，默认 `300ms` 内没有再次触发才刷新布局。（图片加载完成；容器大小、`list`、`width`、`gutter`、`hasAroundGutter`变化时均会触发刷新） |

#### `LazyImg` 方法
| 方法名字   | 返回值类型 | 描述 |
| --------- | --------- | -------------- |
| `load`    | `string`  | img标签的load函数 |
| `success` | `string`  | 图片加载成功 |
| `error`   | `string`  | 图片加载失败 |


#### `外部函数`
`WaterFall`组件向外暴露了一个`renderer`函数，可以直接调用，该方法可以主动重绘列表，使用其他懒加载图片组件的回调函数里可以调用这个renderer来重绘。

使用方法

```html
<Waterfall ref="waterfall"></Waterfall>

const waterfall = ref(null)
waterfall.value.renderer()
```

`breakpoints`默认值，当此属性生效时，width失效
```javascript
breakpoints: {
  1200: {
    // when wrapper width < 1200
    rowPerView: 3,
  },
  800: {
    // when wrapper width < 800
    rowPerView: 2,
  },
  500: {
    // when wrapper width < 500
    rowPerView: 1,
  },
}
```

`loadProps`
```javascript
import loading from 'assets/loading.png'
import error from 'assets/error.png'
loadProps: {
  loading,
  error
}
```

懒加载图片样式覆盖，需要将覆盖样式放在全局才能生效
```css
.lazy__img[lazy=loading] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy=loaded] {
  width: 100%;
}

.lazy__img[lazy=error] {
  padding: 5em 0;
  width: 48px;
}
```
