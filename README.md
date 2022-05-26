<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-18 16:22:04
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-05-07 17:44:08
-->

# Vue3 瀑布流组件

vue3 瀑布流插件，支持 PC 和移动端，支持 animate 的所有动画效果，支持图片懒加载

[在线演示地址](https://vue3-waterfall.netlify.app/)

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
      <p class="text">这是内容</p>
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
| `width`             | `Number`  | `200`         | 卡片在 PC 上的宽度 |
| `breakpoints`       | `Object`  | `breakpoints` | 自定义行显示个数，主要用于对移动端的适配 |
| `gutter`            | `Number`  | `10`          | 卡片之间的间隙 |
| `hasAroundGutter`   | `Boolean` | `true`        | 容器四周是否有 `gutter` 边距 |
| `animationPrefix`   | `String`  | `animate__animated` | `animate.css` 的动画绑定 `className`，默认的是 `4.x.x` 版本，如果想使用老版本，只需要改成 `animated` 即可 |
| `animationEffect`   | `String`  | `fadeIn`      | 卡片入场动画，默认只有 `fadeIn`，引入 `animation.css` 后可使用其他动画 |
| `animationDuration` | `Number`  | `1000`        | 动画执行时间（单位毫秒）|
| `animationDelay`    | `Number`  | `300`         | 动画延迟（单位毫秒）|
| `backgroundColor`   | `String`  | `#ffffff`     | 背景颜色 |
| `loadProps`         | `Object`  | `loadProps`   | 加载的图片和失败的图片 |
| `lazyload`          | `Boolean` | `true`        | 是否开启懒加载 |
| `delay`             | `Number`  | `300`         | 布局刷新的防抖时间，默认 `300ms` 内没有再次触发才刷新布局。（图片加载完成；容器大小、`list`、`width`、`gutter`、`hasAroundGutter`变化时均会触发刷新） |

`breakpoints`
```javascript
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
