<script setup lang="ts">
import { RouterView } from 'vue-router'
import C_Sidebar from './components/C_Sidebar.vue'
</script>

<template>
  <header>
    <nav>
      <C_Sidebar />
    </nav>
  </header>
  <Toast />
  <RouterView />
</template>

<style scoped lang="scss"></style>
