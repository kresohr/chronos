<template>
  <!-- TODO: Add spinner until allEmployeeProjects is fetched-->
  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :header="`Projects for ${selectedUser?.email}`"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :draggable="false"
  >
    <DataTable
      :value="employeeStore.allEmployeeProjects"
      :rows="5"
      :paginator="true"
      :style="[{ width: '100%' }]"
    >
      <Column field="id" header="#"></Column>
      <Column field="name" header="Name"></Column>

      <!-- TODO: Conditionally render if the person is admin & module is enabled -->
      <Column v-if="true" class="employees__edit-column" field="remove" header="Remove">
        <template #body>
          <button class="employees__icon-button">
            <fa-icon :icon="['fas', 'trash']" />
          </button>
        </template>
      </Column>
    </DataTable>
  </Dialog>
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
          <template #body="{ data }">
            <Button
              class="employees__view-button"
              label="View"
              @click="handleProjectViewClick(data)"
            />
          </template>
        </Column>
        <Column class="employees__edit-column" field="edit" header="Edit">
          <template #body>
            <button class="employees__icon-button">
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
import { onMounted, ref, watch } from 'vue'
import { onUnmounted } from 'vue'
import { useEmployeesStore } from '@/stores/employees'
import Dialog from 'primevue/dialog'
import type { Employee } from '@/types/EmployeeType'

const employeeStore = useEmployeesStore()
const windowWidth = ref(window.innerWidth)
const isDialogVisible = ref(false)
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const selectedUser = ref<Employee>()

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

const handleProjectViewClick = (user: Employee) => {
  selectedUser.value = user
  isDialogVisible.value = !isDialogVisible.value
  employeeStore.fetchEmployeeProjects(user)
}

watch(isDialogVisible, () => {
  if (!isDialogVisible.value) {
    selectedUser.value = undefined
  }
})

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

  &__icon-button {
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
