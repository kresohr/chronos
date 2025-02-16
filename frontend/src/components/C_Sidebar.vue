<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <C_SidebarLink to="/" faType="fas" iconName="fa-house">Home</C_SidebarLink>
    <span class="collapse-icon" :class="{ 'rotate-180': isCollapsed }" @click="toggleSidebar">
      <fa-icon :icon="['fas', 'angle-double-left']"></fa-icon>
    </span>
  </div>
</template>

<script setup lang="ts">
import { sidebarStore } from '@/stores/sidebar'
import { computed } from 'vue'
import C_SidebarLink from './C_SidebarLink.vue'

const sidebar = sidebarStore()
const isCollapsed = computed(() => sidebar.isCollapsed)
const sidebarWidth = computed(() => sidebar.calculatedWidth)
const toggleSidebar = () => {
  sidebar.toggleSidebar()
}
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  float: left;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  background-color: #161616;
  box-sizing: border-box;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: #b7b7b7;
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
