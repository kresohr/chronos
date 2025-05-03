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
        v-model:filters="filters"
        v-if="projectStore.allProjects.length > 0"
      >
        <template #header v-if="windowWidth > 600">
          <div class="projects__search">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>
        <Column field="id" header="#" sortable></Column>
        <Column field="name" header="Name" sortable></Column>

        <!-- TODO: Conditionally render if the person is admin & module is enabled -->
        <Column v-if="true" class="projects__edit-column" field="edit" header="Edit">
          <template #body="data">
            <router-link
              :to="`/projects/manage/${data.data.id}`"
              class="projects__icon-button--link"
            >
              <button class="projects__icon-button">
                <fa-icon :icon="['fas', 'pencil']" />
              </button>
            </router-link>
          </template>
        </Column>
      </DataTable>
      <p v-if="projectStore.allProjects.length == 0" class="projects__no-results">
        No projects found.
      </p>

      <router-link class="projects__new-project-button--wrapper" to="/projects/new">
        <!-- TODO: Conditionally render if the person is admin -->
        <Button label="Create New" v-if="true" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import Column from 'primevue/column'
import { Button, IconField, InputIcon, InputText } from 'primevue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const projectStore = useProjectsStore()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
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

  &__no-results {
    text-decoration: underline;
  }

  &__search {
    display: flex;
    justify-content: end;
  }

  &__new-project-button {
    &--wrapper {
      margin-top: var(--spacing-small);
      margin-left: auto;
    }
  }

  &__icon-button {
    all: unset;
    cursor: pointer;
    display: block;
    margin-inline: auto;

    &--link {
      all: unset;
    }
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
