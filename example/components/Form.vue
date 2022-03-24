<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-18 11:16:32
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-21 11:00:15
-->
<template>
  <el-form size="small" label-position="top">
    <el-form-item label="imgSelector">
      <el-input v-model="config.imgSelector" disabled />
    </el-form-item>
    <el-divider content-position="left">
      排版
    </el-divider>
    <el-form-item label="width">
      <el-input-number v-model="config.width" :min="0" :step="10" style="width: 100%" />
    </el-form-item>

    <el-form-item label="gutter">
      <el-input-number v-model="config.gutter" :min="0" :step="2" style="width: 100%" />
    </el-form-item>

    <el-form-item label="hasAroundGutter">
      <el-switch v-model="config.hasAroundGutter" />
    </el-form-item>

    <el-divider content-position="left">
      动画
    </el-divider>
    <el-form-item label="animationEffect">
      <el-select
        v-model="config.animationEffect"
        placeholder="请选择"
        style="width: 100%"
      >
        <el-option
          v-for="item in effectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="animationDuration">
      <el-input-number
        v-model="config.animationDuration"
        :min="0"
        :step="100"
        style="width: 100%"
      />
    </el-form-item>

    <el-form-item label="animationDelay">
      <el-input-number
        v-model="config.animationDelay"
        :min="0"
        :step="100"
        style="width: 100%"
      />
    </el-form-item>

    <el-form-item label="backgroundColor">
      <el-color-picker v-model="config.backgroundColor" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => {},
  },
})

const config = reactive(props.form)

const effectOptions = ref([
  {
    label: 'fadeIn',
    value: 'fadeIn',
  },
  {
    label: 'fadeInUp',
    value: 'animate__fadeInUp',
  },
  {
    label: 'fadeInDown',
    value: 'animate__fadeInDown',
  },
  {
    label: 'zoomIn',
    value: 'animate__zoomIn',
  },
])
</script>

<style lang="scss" scoped>
</style>
