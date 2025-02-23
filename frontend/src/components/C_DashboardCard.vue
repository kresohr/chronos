<template>
  <div class="dashboard-card">
    <div v-if="icon" class="dashboard-card__icon" :style="{ backgroundColor: iconBackgroundColor }">
      <fa-icon :icon="icon" :style="{ color: iconColor }" />
    </div>
    <div class="dashboard-card__content">
      <p class="dashboard-card__title">{{ title }}</p>
      <p class="dashboard-card__value">{{ value }}</p>
      <a v-if="linkText && linkUrl" :href="linkUrl" class="dashboard-card__link">{{ linkText }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title: string
  value: string | number
  icon?: [string, string]
  iconAlt?: string
  linkText?: string
  linkUrl?: string
  iconBackgroundColor?: string
  iconColor?: string
}>()
</script>

<style scoped lang="scss">
.dashboard-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-medium);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: #ffffff;
  box-shadow: var(--box-shadow);
  width: 100%;
}

.dashboard-card__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #ffebc1;
  border-radius: var(--border-radius-circle);
}

.dashboard-card__icon img {
  width: 24px;
  height: auto;
}

.dashboard-card__title {
  font-size: var(--font-size-small);
  color: #666666;
  text-align: center;
  margin-top: var(--spacing-small);
}

.dashboard-card__value {
  font-size: var(--font-size-large);
  font-weight: bold;
  text-align: center;
  margin-top: var(--spacing-small);
}

.dashboard-card__content {
  display: flex;
  flex-direction: column;
}

.dashboard-card__link {
  margin-top: 0.5rem;
  display: inline-block;
  font-size: var(--font-size-base);
  color: var(--primary-link-color);
  text-align: center;
  width: 100%;
}

@media screen and (min-width: 900px) {
  .dashboard-card {
    flex-direction: row;
    max-width: 600px;
  }
  .dashboard-card__content {
    padding-left: var(--spacing-medium);
  }
  .dashboard-card__title,
  .dashboard-card__value,
  .dashboard-card__link {
    text-align: start;
    text-wrap: nowrap;
  }

  .dashboard-card__link {
    margin-top: var(--spacing-medium);
  }
}
</style>
