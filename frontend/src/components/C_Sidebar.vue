<template>
  <div
    class="sidebar"
    :style="{ width: sidebarWidth }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <C_SidebarLink to="/" faType="fas" iconName="fa-house"
      ><p class="sidebar__link">Home</p></C_SidebarLink
    >
    <C_SidebarLink to="/log" faType="fas" iconName="circle-plus"
      ><p class="sidebar__link">Add Log</p></C_SidebarLink
    >
    <C_SidebarLink to="/projects" faType="fas" iconName="briefcase"
      ><p class="sidebar__link">Projects</p></C_SidebarLink
    >
    <C_SidebarLink to="/employees" faType="fas" iconName="user-group"
      ><p class="sidebar__link">Employees</p></C_SidebarLink
    >
    <C_SidebarLink to="/reports" faType="fas" iconName="chart-column"
      ><p class="sidebar__link">Reports</p></C_SidebarLink
    >
    <C_SidebarLink to="/admin" faType="fas" iconName="user-tie" :isAdmin="true"
      ><p class="sidebar__link">Admin Panel</p></C_SidebarLink
    >
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

const handleMouseEnter = () => {
  if (sidebar.isCollapsed && window.innerWidth > 768) {
    toggleSidebar()
  }
}

const handleMouseLeave = () => {
  if (!sidebar.isCollapsed && window.innerWidth > 768) {
    toggleSidebar()
  }
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

  &__link {
    color: var(--navbar-link-color);
    font-size: var(--font-size-base);
    margin: 0;
  }
  a {
    text-decoration: none;
  }
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: var(--spacing-small);
  color: #b7b7b7;
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
