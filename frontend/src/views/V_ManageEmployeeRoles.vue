<template>
  <!-- TODO: Guard route if user is not admin -->
  <!-- TODO: Add spinner loader until everything is ready -->
  <h1>Manage Employee Roles</h1>
  <p>Assign or remove roles for {{ employeeDetails?.email }}</p>

  <div v-if="isFetchingEmployeeDetails" class="manage-employee-roles__spinner">
    <ProgressSpinner />
  </div>

  <div v-if="!isFetchingEmployeeDetails">
    <div class="section--wrapper">
      <h2>Assign New Role</h2>
      <Dropdown
        name="role"
        :options="availableRoles"
        optionLabel="name"
        placeholder="Select a role"
        :filter="true"
        filterPlaceholder="Search by name"
        class="section__dropdown"
        empty-message="No roles available"
        empty-filter-message="No roles found with given name"
        v-model="selectedRole"
      >
        <template #option="slotProps">
          {{ slotProps.option.name }}
        </template>
      </Dropdown>

      <Button :disabled="!selectedRole" label="Assign" @click="handleRoleAssign()" />
    </div>

    <div class="section--wrapper">
      <h2>Assigned Roles</h2>

      <Listbox
        class="section__listbox"
        :options="employeeAssignedRoles"
        filter
        filter-placeholder="Search by name"
        optionLabel="name"
        empty-message="No roles assigned"
        empty-filter-message="No roles found with given name"
      >
        <template #option="slotProps">
          <div>{{ slotProps.option.name }}</div>
          <button
            class="section__listbox__remove-button"
            @click="handleRemoveRole(slotProps.option)"
          >
            <fa-icon :icon="['fas', 'xmark']" style="height: 20px; width: 20px" />
          </button>
        </template>
      </Listbox>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEmployeesStore } from '@/stores/employees'
import router from '@/router'
import { Button } from 'primevue'
import Dropdown from 'primevue/dropdown'
import Listbox from 'primevue/listbox'
import { useRolesStore } from '@/stores/roles'
import type { Role } from '@/types/RoleType'
import ProgressSpinner from 'primevue/progressspinner'

const employeeStore = useEmployeesStore()
const employeeDetails = computed(() => employeeStore.employeeDetails)
const employeeIdFromParams = router.currentRoute.value.params.id
const employeeAssignedRoles = computed(() => employeeStore.allEmployeeRoles)
const isFetchingEmployeeDetails = computed(() => employeeStore.isFetchingEmployeeDetails)
const rolesStore = useRolesStore()
const availableRoles = computed(() => {
  if (employeeAssignedRoles.value) {
    const assignedRoleNames = employeeAssignedRoles.value.map((role) => role.name)
    return rolesStore.allRoles.filter((role) => !assignedRoleNames.includes(role.name))
  } else {
    return []
  }
})
const selectedRole = ref()

employeeStore.fetchEmployeeDetails(Number(employeeIdFromParams))
employeeStore.fetchEmployeeRoles(Number(employeeIdFromParams))
rolesStore.fetchAllRoles()

const handleRoleAssign = () => {
  const oldRolesIds = employeeAssignedRoles.value.map((role) => role.id)
  const newRoleId = selectedRole.value.id
  const combinedRolesIds = [...oldRolesIds, newRoleId]
  employeeStore.modifyEmployeeRoles(Number(employeeIdFromParams), combinedRolesIds)
  selectedRole.value = null
}

const handleRemoveRole = (role: Role) => {
  if (employeeDetails.value) {
    employeeStore.deleteRoleFromEmployee(employeeDetails.value, role)
    selectedRole.value = null
  }
}
</script>

<style lang="scss" scoped>
.manage-employee-roles {
  &__spinner {
    display: flex;
    justify-content: center;
    margin-inline: auto;
    height: 50px;
    width: 50px;
  }
}
.section {
  &--wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-small);
    margin-top: var(--spacing-medium);
    margin-inline: auto;
    width: 100%;
    max-width: 320px;

    Button {
      margin-left: auto;
    }
  }
  &__dropdown,
  &__listbox {
    width: 100%;
  }

  &__listbox {
    &__remove-button {
      background: none;
      border: none;
      cursor: pointer;
      :hover {
        transition: color 0.2s;
        color: var(--primary-button-color);
      }
    }
  }
}
</style>
