<!--
 * @Author: Yaowen Liu
 * @Date: 2022-03-09 10:29:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-09 16:54:53
-->
<template>
  <img class="lazyload-box__img" ref="lazyRef" alt="" srcset="" />
</template>

<script>
import { defineComponent, ref, inject, onMounted, onUnmounted, watch } from 'vue';

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const updatePosition = inject('updatePosition');
    const lazy = inject('lazy');
    const lazyRef = ref(null);

    // watch(
    //   () => props.url,
    //   () => {
    //     lazy.update(lazyRef.value, props.url, () => {
    //       updatePosition();
    //     });
    //   },
    // );

    onMounted(() => {
      lazy.mount(lazyRef.value, props.url, () => {
        updatePosition();
      });
    });

    onUnmounted(() => {
      lazy.unmount(lazyRef.value);
    });

    return {
      lazyRef
    };
  },
});
</script>

<style scoped>
.lazyload-box__img {
  display: block;
  width: 100%;
  line-height: 1;
}
</style>
