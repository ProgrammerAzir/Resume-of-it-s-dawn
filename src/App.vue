<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
const loading  =ref(true);
const progress= ref(0)
const progressFormat = computed(()=>{
  return progress.value.toFixed(2)
})
onBeforeMount(()=>{
  setTimeout(()=>{
    console.log(123);
    
    // loading.value=false
  },3000)
  let time = setInterval(()=>{
    const res = progress.value+0.61
    progress.value=res>100?100:res
    if(res>=100){
      clearInterval(time)
          loading.value=false
    }
  },10)
})
</script>

<template>
  <div :class="['box',loading?'':'out']">
  {{ progressFormat }}
  </div>   
  <RouterView v-show="!loading" />
</template>

<style scoped lang="less">
.box{
  position: absolute;
  background-color: aqua;
  height: 200px;
  width: 200px;
}
.out{
  animation:out 3s;
	-webkit-animation:out --time; /* Safari and Chrome */
  animation-fill-mode:forwards
}
@keyframes out
{
	from {opacity:1;}
	to {
    display: none;
    opacity:0;
  }
}

@keyframes rotate-90-cw{
  0%{transform:rotate(0)}
  100%{transform:rotate(180deg)}}
</style>
