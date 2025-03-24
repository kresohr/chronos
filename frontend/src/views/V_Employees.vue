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
      >
        <Column field="firstName" header="Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="email" header="Email" :hidden="windowWidth < 600"></Column>
        <Column field="role" header="Role" :hidden="windowWidth < 600"></Column>

        <Column
          class="employees__projects-column"
          field="projects"
          header="Projects"
          style="margin-inline: auto"
        >
          <template #body="slotProps">
            <Button class="employees__view-button" label="View" />
          </template>
        </Column>
        <Column class="employees__edit-column" field="edit" header="Edit">
          <template #body="slotProps">
            <button class="employees__edit-button">
              <fa-icon :icon="['fas', 'pencil']" />
            </button>
          </template>
        </Column>
      </DataTable>

      <router-link class="employees__new-employee-button--wrapper" to="/employees/new">
        <Button label="Create New" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { Button } from 'primevue'
import { onMounted, ref } from 'vue'
import { onUnmounted } from 'vue'
import { useEmployeesStore } from '@/stores/employees'

const employeeStore = useEmployeesStore()

const windowWidth = ref(window.innerWidth)

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
