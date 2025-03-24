<template>
  <h1>Projects</h1>
  <p>View full list of projects</p>

  <section>
    <div class="projects">
      <DataTable
        :value="projectStore.allProjects"
        :rows="5"
        :paginator="true"
        :style="[{ width: '100%' }]"
      >
        <Column field="id" header="#"></Column>
        <Column field="name" header="Name"></Column>

        <!-- TODO: Conditionally render if the person is admin & module is enabled -->
        <Column v-if="true" class="projects__edit-column" field="edit" header="Edit">
          <template #body>
            <button class="projects__edit-button">
              <fa-icon :icon="['fas', 'pencil']" />
            </button>
          </template>
        </Column>
      </DataTable>

      <router-link class="projects__new-project-button--wrapper" to="/projects/new">
        <!-- TODO: Conditionally render if the person is admin -->
        <Button label="Create New" v-if="true" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { Button } from 'primevue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { RouterLink } from 'vue-router'

const projectStore = useProjectsStore()

const windowWidth = ref(window.innerWidth)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
  projectStore.fetchAllProjects()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped lang="scss">
.projects {
  margin-top: var(--spacing-large);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: var(--spacing-small);

  &__new-project-button {
    &--wrapper {
      margin-top: var(--spacing-small);
      margin-left: auto;
    }
  }

  &__edit-button {
    all: unset;
    cursor: pointer;
    display: block;
    margin-inline: auto;
  }

  @media screen and (min-width: 1300px) {
    max-width: 1000px;
  }
}

:deep(.projects__edit-column .p-datatable-column-header-content) {
  align-items: center;
  justify-content: center;
}
</style>
