<template>
  <h1>Manage Employees</h1>
  <p>View employees or add new</p>

  <section>
    <div class="manage-employees"></div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.manage-employees {
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
