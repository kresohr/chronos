<template>
  <router-link
    :to="to"
    class="link-wrapper"
    :class="[{ 'link-wrapper--admin': isAdmin }, { 'link-wrapper--active': isActive }]"
  >
    <fa-icon :icon="[`${faType}`, `${iconName}`]" class="link-icon"></fa-icon>
    <Transition name="fade">
      <span v-show="!isCollapsed" class="link-text" :class="[{ 'link-text--active': isActive }]">
        <slot></slot>
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
  isAdmin: { type: Boolean, default: false },
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.fade-slide-enter-active {
  transition: all 0.5s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

.link-wrapper {
  cursor: pointer;
  font-weight: 400;
  color: #ffffff;
  height: 60px;
  margin-top: var(--margin-small);
  &:hover {
    color: var(--primary-button-color-hover);
  }

  &--active {
    color: var(--primary-button-color);
  }

  &--admin {
    margin-top: auto;
    margin-bottom: 70px;
  }
}

.link-icon {
  margin-top: var(--margin-medium);
  height: 22px;
  width: 22px;
}

.link-text {
  text-wrap: nowrap;
  font-family: 'Inter', sans-serif;
  font-weight: 400;

  &--active {
    font-weight: 700;
  }
}
</style>
