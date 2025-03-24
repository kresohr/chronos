<template>
  <h1>Employees</h1>
  <p>Full list of employees</p>

  <section>
    <div class="employees">
      <DataTable
        :value="employeeStore.allEmployees"
        :rows="5"
        :paginator="true"
        :style="[{ width: '100%' }]"
        v-model:filters="filters"
      >
        <template #header v-if="windowWidth > 600">
          <div class="employees__search">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>
        <Column field="firstName" header="Name" sortable></Column>
        <Column field="lastName" header="Last Name" sortable></Column>
        <Column field="email" header="Email" :hidden="windowWidth < 600"></Column>
        <Column field="role" header="Role" :hidden="windowWidth < 600" sortable></Column>

        <Column
          class="employees__projects-column"
          field="projects"
          header="Projects"
          style="margin-inline: auto"
        >
          <template #body>
            <Button class="employees__view-button" label="View" />
          </template>
        </Column>
        <Column class="employees__edit-column" field="edit" header="Edit">
          <template #body>
            <button class="employees__edit-button">
              <fa-icon :icon="['fas', 'pencil']" />
            </button>
          </template>
        </Column>
      </DataTable>

      <router-link class="employees__new-employee-button--wrapper" to="/employees/new">
        <!-- TODO: Conditionally render if the person is admin -->
        <Button v-if="true" label="Create New" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import { Button, IconField, InputIcon, InputText } from 'primevue'
import { onMounted, ref } from 'vue'
import { onUnmounted } from 'vue'
import { useEmployeesStore } from '@/stores/employees'

const employeeStore = useEmployeesStore()
const windowWidth = ref(window.innerWidth)
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
  employeeStore.fetchAllEmployees()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped lang="scss">
.employees {
  margin-top: var(--spacing-large);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: var(--spacing-small);

  &__new-employee-button {
    &--wrapper {
      margin-top: var(--spacing-small);
      margin-left: auto;
    }
  }

  &__view-button {
    display: block;
    margin-inline: auto;
  }

  &__edit-button {
    all: unset;
    cursor: pointer;
    display: block;
    margin-inline: auto;
  }

  &__search {
    display: flex;
    justify-content: end;
  }

  @media screen and (min-width: 1300px) {
    max-width: 1000px;
  }
}

:deep(.employees__projects-column .p-datatable-column-header-content) {
  align-items: center;
  justify-content: center;
}

:deep(.employees__edit-column .p-datatable-column-header-content) {
  align-items: center;
  justify-content: center;
}
</style>
