<template>
  <h1>Admin Panel</h1>
  <p>Manage projects and team members</p>

  <section>
    <div class="admin-panel">
      <C_DashboardCard
        title="Total Employees"
        value="27"
        :icon="['fas', 'user-group']"
        linkText="Manage Employees"
        linkUrl="/employees"
        iconBackgroundColor="#7393B3"
        iconColor="#f1f1f1"
      />
      <C_DashboardCard
        title="Total Roles"
        value="27"
        :icon="['fas', 'fa-user-shield']"
        linkText="Manage Roles"
        linkUrl="/roles"
        iconBackgroundColor="#CBA9B5"
        iconColor="#f1f1f1"
      />
      <C_DashboardCard
        title="Total Projects"
        value="10"
        :icon="['fas', 'suitcase']"
        linkText="Manage Projects"
        linkUrl="/projects"
        iconBackgroundColor="#008000"
        iconColor="#f1f1f1"
      />
      <C_DashboardCard
        title="Total Hours This Week"
        value="621"
        :icon="['fas', 'clock']"
        linkText="View Statistics"
        linkUrl="/statistics"
        iconBackgroundColor="#F4BB44"
        iconColor="#f1f1f1"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import C_DashboardCard from '@/components/C_DashboardCard.vue'
</script>

<style scoped lang="scss">
.admin-panel {
  margin-top: var(--spacing-large);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  max-width: 240px;
  gap: var(--spacing-small);

  @media screen and (min-width: 600px) {
    max-width: 360px;
  }

  @media screen and (min-width: 900px) {
    flex-direction: row;
    max-width: 760px;
  }

  @media screen and (min-width: 1300px) {
    max-width: 1000px;
  }
}
</style>
