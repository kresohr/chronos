<template>
  <!-- TODO: Add spinner until allEmployeeProjects is fetched-->
  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :header="
      isRoleDialog ? `Roles for ${selectedUser?.email}` : `Projects for ${selectedUser?.email}`
    "
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :draggable="false"
  >
    <DataTable
      :value="isRoleDialog ? employeeStore.allEmployeeRoles : employeeStore.allEmployeeProjects"
      :rows="5"
      :paginator="true"
      :style="[{ width: '100%' }]"
      v-model:filters="filterRolesAndProjects"
      v-if="
        isRoleDialog
          ? employeeStore.allEmployeeRoles.length > 0
          : employeeStore.allEmployeeProjects.length > 0
      "
    >
      <template #header v-if="windowWidth > 600">
        <div class="employees__search">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filterRolesAndProjects['global'].value" placeholder="Search..." />
          </IconField>
        </div>
      </template>
      <Column field="id" header="#"></Column>
      <Column field="name" header="Name"></Column>
      <!-- TODO: Conditionally render if the person is admin & module is enabled -->
      <Column v-if="true" class="employees__action-column" field="remove" header="Remove">
        <template #body="{ data }">
          <button
            class="employees__icon-button"
            @click="isRoleDialog ? handleRemoveRole(data) : handleRemoveProject(data)"
          >
            <fa-icon :icon="['fas', 'trash']" />
          </button>
        </template>
      </Column>
    </DataTable>
    <p
      v-if="
        isRoleDialog
          ? employeeStore.allEmployeeRoles.length === 0
          : employeeStore.allEmployeeProjects.length === 0
      "
      class="employees__no-results"
    >
      {{
        isRoleDialog ? 'No roles found for this employee.' : 'No projects found for this employee.'
      }}
    </p>
    <div class="employees__dialog__button--wrapper">
      <!-- TODO: Modify route when new view is added -->
      <router-link to="/projects/new" style="margin-left: auto">
        <!-- TODO: Conditionally render if the person is admin -->
        <Button v-if="true" label="Assign Project" />
      </router-link>
    </div>
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
        v-model:filters="filterEmployees"
        v-if="employeeStore.allEmployees.length > 0"
      >
        <template #header v-if="windowWidth > 600">
          <div class="employees__search">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filterEmployees['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>
        <Column field="firstName" header="Name" sortable></Column>
        <Column field="lastName" header="Last Name" sortable></Column>
        <Column field="email" header="Email" :hidden="windowWidth < 600"></Column>
        <Column
          class="employees__action-column"
          field="role"
          header="Role"
          style="margin-inline: auto"
          :hidden="windowWidth < 600"
          ><template #body="{ data }">
            <Button
              class="employees__view-button"
              label="View"
              @click="handleRoleViewClick(data)"
            /> </template
        ></Column>

        <Column class="employees__action-column" field="projects" header="Projects">
          <template #body="{ data }">
            <Button
              class="employees__view-button"
              label="View"
              @click="handleProjectViewClick(data)"
            />
          </template>
        </Column>
        <Column class="employees__action-column" field="edit" header="Edit">
          <template #body="{ data }">
            <button class="employees__icon-button" @click="handleEditEmployeeClick(data)">
              <fa-icon :icon="['fas', 'pencil']" />
            </button>
          </template>
        </Column>
      </DataTable>
      <p v-if="employeeStore.allEmployees.length == 0" class="employees__no-results">
        No employees found.
      </p>

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
import type { Project } from '@/types/ProjectType'
import router from '@/router'
import type { Role } from '@/types/RoleType'

const employeeStore = useEmployeesStore()
const windowWidth = ref(window.innerWidth)
const isDialogVisible = ref(false)
const isRoleDialog = ref(false)
const filterEmployees = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const filterRolesAndProjects = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const selectedUser = ref<Employee>()

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

const handleRoleViewClick = (user: Employee) => {
  selectedUser.value = user
  isDialogVisible.value = !isDialogVisible.value
  if (user && user.id) {
    employeeStore.fetchEmployeeRoles(user.id)
    isRoleDialog.value = true
  }
}

const handleProjectViewClick = (user: Employee) => {
  selectedUser.value = user
  isDialogVisible.value = !isDialogVisible.value
  if (user && user.id) {
    employeeStore.fetchEmployeeProjects(user.id)
    isRoleDialog.value = false
  }
}

const handleRemoveProject = (selectedProject: Project) => {
  if (selectedUser.value) {
    employeeStore.deleteProjectFromEmployee(selectedUser.value, selectedProject)
  }
}

const handleRemoveRole = (selectedRole: Role) => {
  if (selectedUser.value) {
    employeeStore.deleteRoleFromEmployee(selectedUser.value, selectedRole)
  }
}

const handleEditEmployeeClick = (user: Employee) => {
  router.push(`/employees/manage/${user.id}`)
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

  &__dialog {
    &__button {
      &--wrapper {
        display: flex;
        justify-content: end;
        margin-top: var(--spacing-small);
      }
    }
  }

  &__no-results {
    text-decoration: underline;
  }

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

:deep(.employees__action-column .p-datatable-column-header-content) {
  margin-inline: auto;
  align-items: center;
  justify-content: center;
}
</style>
