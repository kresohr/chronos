import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const sidebarStore = defineStore('sidebar', () => {
  const isCollapsed = ref(true)
  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value
  }
  const sidebarWidthExpanded = 180
  const sidebarWidthCollapsed = 40
  const calculatedWidth = computed(() => 
    isCollapsed.value ? `${sidebarWidthCollapsed}px`:`${sidebarWidthExpanded}px`
  )

  return { isCollapsed, toggleSidebar, calculatedWidth }
})
