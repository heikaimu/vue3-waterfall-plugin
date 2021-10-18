<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 10:20:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-10-18 15:01:19
-->
<template>
  <div
    id="waterfallWrapper"
    class="waterfall__list"
    ref="waterfallWrapper"
    :style="{ height: `${waterfallWrapperHeight}px` }"
  >
    <div
      class="waterfall__item"
      v-for="(item, index) in list"
      :ref="setItemRef"
      :key="index"
      :style="{
        width: `${itemWidth}px`,
      }"
    >
      <div>
        <slot name="item" :item="item" :itemWidth="itemWidth" :url="getURL(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  ref,
  nextTick,
  watch,
} from "vue";
import { getItemWidth } from "../lib/utils/itemWidth";
import { getMin, getMax } from "../lib/utils/number";
import { debounce } from "../lib/utils/debounce";
import { getValue } from "../lib/utils/getValue";
import { imageLoaded } from "../lib/utils/images";
import { hasClass, addClass, prefixStyle } from "../lib/utils/dom";

const transform = prefixStyle("transform");

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    imgSelector: {
      type: String,
      default: "src",
    },
    width: {
      type: Number,
      default: 200,
    },
    breakpoints: {
      type: Object,
      default: () => ({
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
      }),
    },
    gutter: {
      type: Number,
      default: 10,
    },
    hasAroundGutter: {
      type: Boolean,
      default: true,
    },
    animationEffect: {
      type: String,
      default: "fadeIn",
    },
    animationDuration: {
      type: Number,
      default: 1000,
    },
    animationDelay: {
      type: Number,
      default: 300,
    },
    backgroundColor: {
      type: String,
      default: "#fff",
    },
  },

  setup(props) {
    // set wrapper width
    const waterfallWrapper = ref(null);
    const waterfallWrapperWidth = ref(0);

    function setWaterfallWrapperWidth() {
      waterfallWrapperWidth.value =
        waterfallWrapper.value.getBoundingClientRect().width;
    }

    // set item width
    const itemWidth = ref(0);

    function setItemWidth() {
      itemWidth.value = getItemWidth({
        breakpoints: props.breakpoints,
        wrapperWidth: waterfallWrapperWidth.value,
        gutter: props.gutter,
        hasAroundGutter: props.hasAroundGutter,
        initWidth: props.width,
      });
    }

    // set row count
    const rowCount = ref(0);

    function setRowCount() {
      if (props.hasAroundGutter) {
        rowCount.value = Math.floor(
          (waterfallWrapperWidth.value - props.gutter) /
            (itemWidth.value + props.gutter)
        );
      } else {
        rowCount.value = Math.floor(
          (waterfallWrapperWidth.value + props.gutter) /
            (itemWidth.value + props.gutter)
        );
      }
    }

    // set water fall wrapper offset x
    const waterfallOffsetX = ref(0);

    function setWaterfallOffsetX() {
      let contextWidth = 0;
      if (props.hasAroundGutter) {
        contextWidth =
          rowCount.value * (itemWidth.value + props.gutter) + props.gutter;
      } else {
        contextWidth =
          rowCount.value * (itemWidth.value + props.gutter) - props.gutter;
      }

      waterfallOffsetX.value = (waterfallWrapperWidth.value - contextWidth) / 2;
    }

    // set item position X
    const posX = ref([]);

    function setPosX() {
      posX.value = [];
      posY.value = [];
      for (let i = 0; i < rowCount.value; i++) {
        let x = 0;
        if (props.hasAroundGutter) {
          x =
            props.gutter * (i + 1) +
            itemWidth.value * i +
            waterfallOffsetX.value;
        } else {
          x = props.gutter * i + itemWidth.value * i + waterfallOffsetX.value;
        }
        posX.value.push(x);
        posY.value.push(props.hasAroundGutter ? props.gutter : 0);
      }
    }

    // get item refs
    let itemRefs = [];

    function setItemRef(el) {
      if (el) {
        itemRefs.push(el);
      }
    }
    onBeforeUpdate(() => {
      itemRefs = [];
    });

    // calculate items position and calculate wrapper height
    const posY = ref([]);
    const waterfallWrapperHeight = ref(0);

    function addAnimation(item) {
      const content = item.firstChild;
      if (!hasClass(content, "animated")) {
        const durationSec = `${props.animationDuration / 1000}s`;
        const delaySec = `${props.animationDelay / 1000}s`;
        content.style["animation-duration"] = durationSec;
        content.style["-webkit-animation-duration"] = durationSec;
        content.style["animation-delay"] = delaySec;
        content.style["-webkit-animation-delay"] = delaySec;
        content.style.visibility = "visible";
        addClass(content, "animated");
        addClass(content, props.animationEffect);
      }
    }

    function setListPos() {
      for (let i = 0; i < itemRefs.length; i++) {
        const item = itemRefs[i];

        const minPosY = getMin(posY.value);
        const minPosYIndex = posY.value.indexOf(minPosY);
        const currentPosX = posX.value[minPosYIndex];

        // set position
        item.style.visibility = "hidden";
        item.style[transform] =
          "translate3d(" + currentPosX + "px," + minPosY + "px, 0)";

        // update group height by current item element
        const { height } = item.getBoundingClientRect();
        posY.value[minPosYIndex] += height + props.gutter;

        // add animation
        addAnimation(item);
      }

      // set wrapper height
      const maxHeight = props.list.length > 0 ? getMax(posY.value) : 0;
      waterfallWrapperHeight.value = props.hasAroundGutter
        ? maxHeight
        : maxHeight - props.gutter;
    }

    // render items
    const renderItems = debounce(async function () {
      setWaterfallWrapperWidth();
      await nextTick();
      setItemWidth();
      await nextTick();
      setRowCount();
      await nextTick();
      setWaterfallOffsetX();
      await nextTick();
      setPosX();
      await nextTick();
      setListPos();
    }, 300);

    // watch list length, if changed render again
    onUpdated(() => {
      renderItems();
    });

    // watch props, if changed, render again
    watch(
      () => [props.width, props.gutter, props.hasAroundGutter],
      () => {
        renderItems();
      }
    );

    watch(
      () => props.imgSelector,
      () => {
        loadImages();
      }
    );

    // getURL
    function getURL(item) {
      return getValue(item, props.imgSelector)[0];
    }

    // load images
    function loadImages() {
      const images = props.list.map((item) => {
        const url = getURL(item);
        return url;
      });

      // when a image loaded, render items again
      imageLoaded(images, () => {
        renderItems();
      });
    }

    // when list changed, load all images
    watch(
      () => props.list.length,
      () => {
        loadImages();
      },
      { deep: true }
    );

    // observer wrapper width change
    let wrapperObserver = null;
    let currentWidth = 0;

    // add observer
    function addWrapperSizeListener() {
      const dom = document.getElementById("waterfallWrapper");
      wrapperObserver = new ResizeObserver((entries) => {
        const newWidth = ((entries[0] || {}).contentRect || {}).width || 0;
        if (newWidth === currentWidth) {
          return;
        }

        currentWidth = newWidth;
        // console.log("render by resize");
        renderItems();
      });
      wrapperObserver.observe(dom);
    }

    // remove observe
    function removeWrapperSizeListener() {
      const dom = document.getElementById("waterfallWrapper");
      wrapperObserver.unobserve(dom);
    }

    // mounted
    onMounted(() => {
      addWrapperSizeListener();
    });

    // before destroy
    onBeforeUnmount(() => {
      removeWrapperSizeListener();
    });

    return {
      waterfallWrapper,
      itemWidth,
      rowCount,
      setItemRef,
      waterfallWrapperHeight,
      getURL,
    };
  },
});
</script>

<style scoped>
.waterfall__list {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: v-bind(backgroundColor);
}
.waterfall__item {
  position: absolute;
  left: 0;
  top: 0;
  visibility: hidden;
}
.waterfall__item img {
  width: 100%;
}

/* animation */
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
</style>