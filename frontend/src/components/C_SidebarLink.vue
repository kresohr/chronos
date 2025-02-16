<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <fa-icon :icon="[`${faType}`, `${iconName}`]"></fa-icon>
    <Transition name="fade">
      <span v-show="!isCollapsed">
        <slot style="text-decoration: none"></slot>
      </span>
    </Transition>
  </router-link>
</template>

<script setup lang="ts">
import { sidebarStore } from '@/stores/sidebar'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const sidebar = sidebarStore()
const isCollapsed = computed(() => sidebar.isCollapsed)

const props = defineProps({
  to: { type: String, required: true },
  faType: {
    type: String,
    required: true,
  },
  iconName: { type: String, required: true },
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 0;
}

.link {
  display: flex;
  gap: var(--gap-small);
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  color: #ffffff;
  padding: var(--padding-small);
}
</style>
