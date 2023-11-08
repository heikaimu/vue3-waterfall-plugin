<template>
  <div>
    <nav class="page-nav">
      <router-link to="/page-a">
        基础API
      </router-link>
      <router-link to="/page-b">
        列表数据变更
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
  padding: 8px;
  background-color: #222222;
}

.page-nav a {
  margin-left: 20px;
  color: #fff;
}

.page-nav a.router-link-active {
  color: yellow;
}
</style>
