<script setup lang="ts">
import { RouterView } from 'vue-router'
import C_Sidebar from './components/C_Sidebar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <C_Sidebar />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
