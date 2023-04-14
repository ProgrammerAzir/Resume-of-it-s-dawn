<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import AppAside from "./AppAside.vue";
const loading = ref(true);
const progress = ref(0);
const progressFormat = computed(() => {
  return progress.value.toFixed(2);
});
onBeforeMount(() => {
  setTimeout(() => {
    console.log(123);

    // loading.value=false
  }, 3000);
  let time = setInterval(() => {
    const res = progress.value + 0.61;
    progress.value = res > 100 ? 100 : res;
    if (res >= 100) {
      clearInterval(time);
      loading.value=false
    }
  }, 10);
});

function progressTasks(...tasks: any[]) {
  return {
    stasrt() {},
    pause() {},
  };
}
let tasks = undefined;
function initTasks() {
  tasks = progressTasks([
    setTimeout(() => console.log(2), 1000),
    setTimeout(() => console.log(3), 1000),
    setTimeout(() => console.log(4), 1000),
  ]);
}
function open() {}
function pause() {}
</script>

<template>
  <div :class="['box', loading ? '' : 'out']">
    <botton @click="open">开始</botton>
    <botton @click="pause">暂停</botton>

    <div class="sun-box">
      <div class="sun"></div>
    </div>
    <!-- {{ progressFormat }} -->
  </div>
  <AppAside v-show="!loading"></AppAside>
</template>

<style scoped lang="less">
@containerSize: 1000px;
.box {
  position: absolute;
  background-color: #ffeea2;
  height: 100%;
  width: 100%;
  display: flex;
  padding-top: 50%;
  align-items: center;
  justify-content: center;
  //  overflow: hidden;
  .sun-box {
    position: relative;
    height: @containerSize;
    width: 120%;
    border-radius: 50%;
    outline: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.sun {
  margin: 0;
  padding: 0;
  /* 绝对定位 水平垂直居中 */
  // transform: rotate(15deg) translateY(-@containerSize/2);
  width: 300px;
  height: 300px;
  background: orange;
  box-shadow: 0 0 60px orange;
  border-radius: 50%;
  // animation: ball-spin 3s infinite linear;
}
.out {
  animation: out 3s;
  -webkit-animation: out --time; /* Safari and Chrome */
  animation-fill-mode: forwards;
}
@keyframes ball-spin {
  0% {
    transform: rotate(0deg) scaleY(2) rotate(30deg) scale(1);
  }

  100% {
    transform: rotate(-360deg) scaleY(2) rotate(30deg) scale(1);
  }
}

@keyframes out {
  from {
    opacity: 1;
  }
  to {
    display: none;
    opacity: 0;
  }
}

@keyframes rotate-90-cw {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>
