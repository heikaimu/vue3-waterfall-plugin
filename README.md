<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-18 16:22:04
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-09-21 09:29:02
-->

# Vue3 瀑布流组件

Vue3瀑布流插件支持PC和移动端，包含Animate的各种动画效果以及图片懒加载功能。

- [在线演示地址](https://heikaimu.github.io/vue3-waterfall-plugin/#/page-a)
- [Vue2 版本(不再更新)](https://github.com/heikaimu/vue-waterfall-plugin)
- [卡片虚拟滚动（有需求的可以查看）](https://heikaimu.github.io/vue3-virtual-scroll/#/list)


## 安装

```bash
npm install vue-waterfall-plugin-next
```

## 使用

```javascript
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

// 数据
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

```html
<Waterfall :list="list">
  <!-- v2.6.0之前版本插槽数据获取 -->
  <!-- <template #item="{ item, url, index }"> -->
  <!-- 新版插槽数据获取 -->
  <template #default="{ item, url, index }">
    <div class="card">
      <LazyImg :url="url" />
      <p class="text">这是具体内容</p>
    </div>
  </template>
</Waterfall>
```

## `Props` 参数
| 参数名              | 类型    | 默认值     | 描述                                                                               |
| ----------------- | ------- | ----------- | ----------------------------------------------------------------------------------------- |
| `list`              | `Array`   | []          | 列表数据 |
| `rowKey`           | `String`  | `id`          | 数据唯一的字段，比如列表里面的`id`, 如果要删除卡片，该字段为必填 |
| `imgSelector`       | `String`  | `src`         | 图片字段选择器，如果层级较深，使用 `xxx.xxx.xxx` 方式 |
| `width`             | `Number`  | `200`         | 卡片在 PC 上的宽度, 与breakpoints一样可以确定卡片的宽度以及每行个数, 但**breakpoints优先级高于width** |
| `breakpoints`       | `Object`  | {<br>1200:{rowPerView:3},<br>800:{rowPerView:2},<br>500:{rowPerView:1}<br>} | 类似css的@media, 定义不同容器宽度下每行卡片个数，主要用于对移动端的适配 |
| `gutter`            | `Number`  | `10`          | 卡片之间的间隙 |
| `hasAroundGutter`   | `Boolean` | `true`        | 容器四周是否有 `gutter` 边距 |
| `posDuration`       | `Number`  | `300`         | 卡片移动到正确位置的动画时间 |
| `animationPrefix`   | `String`  | `animate__animated` | 详情见下文《动画样式》 |
| `animationEffect`   | `String`  | `fadeIn`      | 卡片入场动画，默认只有 `fadeIn`，引入 `animation.css` 后可使用其他动画 |
| `animationDuration` | `Number`  | `1000`        | 卡片入场动画执行时间（单位毫秒）,该动画时间只影响卡片重拍的时间，一般情况都不用修改，如果想要修改飞入动画的执行时间，见下文|
| `animationDelay`    | `Number`  | `300`         | 卡片入场动画延迟（单位毫秒）|
| `animationCancel`   | `Boolean` | `false`       | 取消动画，开启后，所有动画属性都不生效 |
| `backgroundColor`   | `String`  | `#ffffff`     | 背景颜色 |
| `loadProps`         | `Object`  | `loadProps`   | 懒加载图片组件的属性设置，详情见下文《懒加载属性》 |
| `lazyload`          | `Boolean` | `true`        | 是否开启懒加载 |
| `crossOrigin`       | `Boolean` | `true`        | 图片加载是否开启跨域 |
| `delay`             | `Number`  | `300`         | 布局刷新的防抖时间，默认 `300ms` 内没有再次触发才刷新布局。（图片加载完成；容器大小、`list`、`width`、`gutter`、`hasAroundGutter`变化时均会触发刷新） |
| `align`             | `String` | `center`       | 卡片的对齐方式，可选值为：`left`,`center`,`right` |

## `WaterfallList` 方法
| 方法名字   | 返回值类型 | 描述 |
| --------- | --------- | -------------- |
| `afterRender` |        | 本次卡片坐标计算完成并且移动到了对应位置（列表渲染的过程可能会多次触发，比如有一张图片加载完成就会重新计算位置） |

## `LazyImg` 方法
| 方法名字   | 返回值类型 | 描述 |
| --------- | --------- | -------------- |
| `load`    | `string`  | img标签的load函数 |
| `success` | `string`  | 图片加载成功 |
| `error`   | `string`  | 图片加载失败 |

## 强制更新
```html
<Waterfall ref="waterfall"></Waterfall>

const waterfall = ref(null)
waterfall.value.renderer()
```
`WaterFall`组件向外暴露了一个`renderer`函数，可以直接调用，该方法可以主动重绘列表，使用其他懒加载图片组件的回调函数里可以调用这个renderer来重绘。

## 动画样式
首先需要明白，这里的动画指的是数据插入时的动画，比如第一次加载数据已经加载更多的时候的一个插入动画。
想要使用动画必须引入`animate.css`或者定义一个动画`className`
1. 如果引入了`animate.css`，并且版本是`4.x.x`及以上，可以不作任何处理
2. 如果引入了`animate.css`，并且是老版本则需要将`animationPrefix`设置为`animated`
3. 如果不想引入`animate.css`，想使用插件默认的`fadeIn`效果，需要手动加入下面的样式
```css
.animate__animated {
  animation-fill-mode: both;
  animation-duration: 1s;
}
```
`animation-duration` 决定了卡片的飞入动画执行时间！！！如果引入了`animate.css`并且想改变飞入动画的时间，则需要手动去修改`animation-duration`的值。


## 断点详细配置
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
## 懒加载属性
```javascript
import loading from 'assets/loading.png'
import error from 'assets/error.png'
loadProps: {
  loading,
  error,
  ratioCalculator: (width, height) => {
    // 我设置了最小宽高比
    const minRatio = 3 / 4;
    const maxRatio = 4 / 3;
    // 获取当前图片的比例
    const curRatio = width / height;
    // 如果当前图片比列不在此范围内，我们取最小或者最大值
    if (curRatio < minRatio) {
      return minRatio;
    } else if (curRatio > maxRatio) {
      return maxRatio;
    } else {
      return curRatio;
    }
  }
}
```
1. `loading` 是图片加载时候的等待图
2. `error` 是图片加载失败后的占位图
3. `ratioCalculator` 是一个设置懒加载图片展示比列的方法，当我们不自定义的时候，懒加载最终出来的图比列就是图片本身，但是有时候我们的图片尺寸可能长宽比较极限，这样出来样式不太美观，我们都可以用这个方法按照我们的想法进行设置。


自定义懒加载图片样式
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
