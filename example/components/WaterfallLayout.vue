<template>
  <div>
    <nav class="page-nav">
      <router-link to="/page-a">
        Page A
      </router-link>
      <router-link to="/page-b">
        Page B
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
  padding: 10px;
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
