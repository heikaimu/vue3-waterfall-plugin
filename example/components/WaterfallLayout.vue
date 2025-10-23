<template>
  <div>
    <nav class="page-nav">
      <router-link to="/page-a">
        基础API展示
      </router-link>
      <router-link to="/page-c">
        配合better-scroll实现滚动加载
      </router-link>
      <router-link to="/page-b">
        数据分页展示
      </router-link>
      <router-link to="/page-d">
        断点实现全屏幕铺满
      </router-link>
      <router-link to="/page-e">
        tab切换多个列表保持状态
      </router-link>
    </nav>

    <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.page-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  padding: 8px;
  padding-right: 30px;
  background-color: #222222;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.page-nav a {
  margin-left: 20px;
  color: #fff;
}

.page-nav a.router-link-active {
  color: yellow;
}
</style>
