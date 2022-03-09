<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 10:20:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 18:25:01
-->
<template>
  <div class="example">
    <!-- 左侧列表 -->
    <div class="example__content--left">
      <Waterfall
        :list="list"
        :rowKey="options.rowKey"
        :gutter="options.gutter"
        :hasAroundGutter="options.hasAroundGutter"
        :width="options.width"
        :breakpoints="options.breakpoints"
        :imgSelector="options.imgSelector"
        :backgroundColor="options.backgroundColor"
        :animationEffect="options.animationEffect"
        :animationDuration="options.animationDuration"
        :animationDelay="options.animationDelay"
        :lazyload="options.lazyload"
        :loadProps="options.loadProps"
      >
        <template #item="{ item, url, index }">
          <div class="card-box" @click="handlePreview(item, url)">
            <LazyImg :url="url" />
            <div class="card-info">
              <p class="card-info__title">{{ item.name }}</p>
            </div>
            <div class="card-buttons">
              <el-button size="mini" @click.stop="handleStar(item)" plain type="primary" icon="el-icon-star-on"
                >收藏</el-button
              >
              <el-button size="mini" @click.stop="handleDelete(item, index)" plain type="danger" icon="el-icon-delete"
                >删除</el-button
              >
            </div>
            <div class="card-star" v-if="item.star">
              <i class="el-icon-star-on"></i>
            </div>
          </div>
        </template>
      </Waterfall>

      <div class="add-wrapper">
        <p class="text" @click="handleLoadMore">加载更多</p>
      </div>
    </div>

    <!-- 右侧配置 -->
    <div class="example__content--right">
      <div class="controller-button full">
        <span class="el-icon-close" v-if="isOpen" @click="handleToggleController(false)"></span>
        <span class="el-icon-setting" v-else @click="handleToggleController(true)"></span>
      </div>

      <div class="controller-form-wrapper">
        <ControllerForm v-if="isOpen" :form="options" />
      </div>

      <Github />
    </div>

    <!-- 大图预览 -->
    <el-dialog v-model="previewVisible" :title="previewTitle" width="800px">
      <img style="width:100%" :src="previewURL" alt="" srcset="" />
    </el-dialog>
  </div>
</template>

<script>
// dev test
// import { Waterfall, LazyImg } from '../index.js';

// npm package test
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';

import ControllerForm from './Form.vue';
import Github from './Github.vue';

import { reactive, ref, onMounted, computed } from 'vue';
import { getList, getNoSizeImages } from '../api';
import loading from '../assets/loading.png';
import error from '../assets/error.png';

// 侧边栏控制
function useSlideBar() {
  const WIDTH = '200px';
  const controllerWidth = ref(WIDTH);
  const isOpen = computed(() => {
    return controllerWidth.value === WIDTH;
  });
  function handleToggleController(flag) {
    controllerWidth.value = flag ? WIDTH : 'auto';
  }

  return {
    isOpen,
    controllerWidth,
    handleToggleController,
  };
}

function usePreview() {
  const previewVisible = ref(false);
  const previewTitle = ref('');
  const previewURL = ref('');

  const handlePreview = (item, url) => {
    previewTitle.value = item.name;
    previewURL.value = url;
    previewVisible.value = true;
  };

  return {
    previewVisible,
    previewTitle,
    previewURL,
    handlePreview,
  };
}

function useWaterfall() {
  const list = reactive([]);
  const options = reactive({
    // 唯一key值
    rowKey: 'id',
    // 卡片之间的间隙
    gutter: 10,
    // 是否有周围的gutter
    hasAroundGutter: true,
    // 卡片在PC上的宽度
    width: 320,
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
    animationEffect: 'fadeInUp',
    // 动画时间
    animationDuration: 1000,
    // 动画延迟
    animationDelay: 300,
    // 背景色
    backgroundColor: '#2C2E3A',
    // imgSelector
    imgSelector: 'src.original',
    // 加载配置
    loadProps: {
      loading,
      error,
    },
    // 是否懒加载
    lazyload: true,
  });

  onMounted(() => {
    handleLoadMore();
  });

  // 加载更多
  function handleLoadMore() {
    list.push(...getNoSizeImages(30));
  }

  return {
    list,
    options,
    handleLoadMore,
  };
}

export default {
  components: {
    Waterfall,
    LazyImg,
    ControllerForm,
    Github,
  },

  setup() {
    // 列表
    const { list, options, handleLoadMore } = useWaterfall();

    // 侧边栏控制
    const { isOpen, controllerWidth, handleToggleController } = useSlideBar();

    const { previewVisible, previewTitle, previewURL, handlePreview } = usePreview();

    // 编辑
    function handleStar(item) {
      item.star = !item.star;
    }

    // 删除
    function handleDelete(item, index) {
      this.list.splice(index, 1);
    }

    return {
      list,
      options,
      handleLoadMore,
      isOpen,
      controllerWidth,
      handleToggleController,
      previewVisible,
      previewTitle,
      previewURL,
      handlePreview,
      handleStar,
      handleDelete,
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
.card-box {
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  position: relative;
  cursor: pointer;
}

.card-star {
  position: absolute;
  right: 10px;
  top: 10px;
}

.card-star i {
  font-size: 30px;
  color: gold;
}

.card-info {
  padding: 10px;
}

.card-info__title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
}

.card-buttons {
  padding: 10px;
  text-align: right;
  border-top: 1px solid #e7e7e7;
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
