<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ConfigProvider } from 'ant-design-vue'
import { inject } from 'vue'

const theme = inject('theme')
</script>

<template>
  <ConfigProvider :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>

<style scoped>

</style>
