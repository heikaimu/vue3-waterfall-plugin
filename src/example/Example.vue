<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 10:20:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-22 15:29:11
-->
<template>
  <div class="example">
    <div class="example__content--left">
      <VueWaterfallPluginNext
        :list="list"
        :gutter="options.gutter"
        :hasAroundGutter="options.hasAroundGutter"
        :width="options.width"
        :breakpoints="options.breakpoints"
        :imgSelector="options.imgSelector"
        :backgroundColor="options.backgroundColor"
        :animationEffect="options.animationEffect"
        :animationDuration="options.animationDuration"
        :animationDelay="options.animationDelay"
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
      <div class="add-wrapper">
        <p class="text" @click="handleAdd">加载更多</p>
      </div>
    </div>

    <div class="example__content--right">
      <div class="controller-button full">
        <span
          class="el-icon-close"
          v-if="isOpen"
          @click="handleToggleController(false)"
        ></span>
        <span
          class="el-icon-setting"
          v-else
          @click="handleToggleController(true)"
        ></span>
      </div>

      <div class="controller-form-wrapper">
        <controller-form v-if="isOpen" :form="options"></controller-form>
      </div>

      <github />
    </div>
  </div>
</template>

<script>
// dev test
// import VueWaterfallPluginNext from "../index";

// npm package test
import VueWaterfallPluginNext from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

import ControllerForm from "./Form.vue";
import Github from "./Github.vue";

import { reactive, toRefs, ref, onMounted, computed } from "vue";
import { getList } from "../api";

export default {
  components: {
    VueWaterfallPluginNext,
    ControllerForm,
    Github,
  },

  setup() {
    const state = reactive({
      // 列表数据
      list: [],
      // options
      options: {
        // 卡片之间的间隙
        gutter: 10,
        // 是否有周围的gutter
        hasAroundGutter: true,
        // 卡片在PC上的宽度
        width: 240,
        // 自定义行显示个数，主要用于对移动端的适配
        breakpoints: {
          1200: {
            //当屏幕宽度小于等于1200
            rowPerView: 4,
          },
          800: {
            //当屏幕宽度小于等于800
            rowPerView: 3,
          },
          500: {
            //当屏幕宽度小于等于500
            rowPerView: 2,
          },
        },
        // 动画效果
        animationEffect: "fadeInUp",
        // 动画时间
        animationDuration: 1000,
        // 动画延迟
        animationDelay: 300,
        // 背景色
        backgroundColor: "#2C2E3A",
        // imgSelector
        imgSelector: "src.original",
      },
    });

    onMounted(() => {
      state.list = getList(8);
    });

    function handleAdd() {
      state.list.push(...getList(10));
    }

    // controller
    const WIDTH = "200px";
    const controllerWidth = ref(WIDTH);
    const isOpen = computed(() => {
      return controllerWidth.value === WIDTH;
    });
    function handleToggleController(flag) {
      controllerWidth.value = flag ? WIDTH : "auto";
    }

    // 点击
    function handleClickCard(item) {
      alert(item.name);
    }

    return {
      ...toRefs(state),
      handleAdd,
      handleClickCard,
      handleToggleController,
      isOpen,
      controllerWidth,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.example {
  width: 100vw;
  height: calc(100vh);
  display: flex;
}

.example__content--left {
  height: 100%;
  flex: 1;
  overflow-y: auto;
  background-color: v-bind(options.backgroundColor);
}

.example__content--left::-webkit-scrollbar {
  width: 3px;
}
.example__content--left::-webkit-scrollbar-thumb {
  background: #d8d8d8;
  border-radius: 10px;
}
.example__content--left::-webkit-scrollbar-track-piece {
  background: transparent;
}

.example__content--right {
  flex: 0 0 v-bind(controllerWidth);
  height: 100%;
  background-color: #ffffff;
  position: relative;

  display: flex;
  flex-direction: column;
}

.controller-button {
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}

.controller-button span {
  display: inline-block;
  padding: 5px;
  font-size: 20px;
  color: #333333;
  font-weight: 600;
  cursor: pointer;
}

.controller-form-wrapper {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

/* card */
.card {
  background-color: #ffffff;
}
.card img {
  display: block;
  width: 100%;
}
.card .text {
  padding: 10px;
  text-align: center;
  font-size: 14px;
  color: #666666;
}

.add-wrapper {
  padding: 20px;
  text-align: center;
}
.add-wrapper .text {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 2px;
  background-color: #ffffff;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
}

.add-wrapper .text:hover {
  color: #111111;
}

.full {
  width: 100%;
}
</style>