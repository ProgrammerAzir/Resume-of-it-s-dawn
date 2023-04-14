<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import {
  PieChartOutlined,
} from '@ant-design/icons-vue';
import { useRoute, useRouter } from "vue-router";
import type SubMenu from "./components/SubMenu.vue";
const { collapsed, selectedKeys, openKeys, preOpenKeys } = toRefs(
  reactive({
    collapsed: false,
    selectedKeys: ["1"],
    openKeys: ["sub1"],
    preOpenKeys: ["sub1"],
  })
);
const router = useRouter()
console.log(router.options.routes);
console.log(useRoute());

</script>
<template>
  <div class="root">
    <div class="left">
        <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
    <SubMenu :subMenuArr="router.options.routes"></SubMenu>
      <a-menu-item key="1" >
        <template #icon>
          <!-- <PieChartOutlined /> -->
        </template>
        <span>Option 1</span>
      </a-menu-item>
    </a-menu>
    </div>
    
    <RouterView />
  </div>
</template>
<style lang="less" scoped>
    .root{
        display: flex;
        height: 100%;
    }
    .left{
        width: 200px;
        background-color: #001529
    }
</style>
