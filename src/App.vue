<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="box"></div>   
  <RouterView />
</template>

<style scoped lang="less">
.box{
  background-color: aqua;
  height: 200px;
  width: 200px;
}
</style>
