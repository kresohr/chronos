<template>
  <!-- TODO: Guard route if user is not admin -->
  <!-- TODO: Add spinner loader until everything is ready -->
  <h1>Manage Employee Projects</h1>
  <p>Assign or remove projects for {{ employeeDetails?.email }}</p>

  <div v-if="isFetchingEmployeeDetails" class="manage-employee-projects__spinner">
    <ProgressSpinner />
  </div>

  <div v-if="!isFetchingEmployeeDetails">
    <div class="section--wrapper">
      <h2>Assign New Projects</h2>
      <Dropdown
        name="project"
        :options="availableProjects"
        optionLabel="name"
        placeholder="Select a project"
        :filter="true"
        filterPlaceholder="Search by name"
        class="section__dropdown"
        empty-message="No projects available"
        empty-filter-message="No projects found with given name"
        v-model="selectedProject"
      >
        <template #option="slotProps">
          {{ slotProps.option.name }}
        </template>
      </Dropdown>

      <Button :disabled="!selectedProject" label="Assign" @click="handleProjectAssign()" />
    </div>

    <div class="section--wrapper">
      <h2>Assigned Projects</h2>

      <Listbox
        class="section__listbox"
        :options="employeeAssignedProjects"
        filter
        filter-placeholder="Search by name"
        optionLabel="name"
        empty-message="No projects assigned"
        empty-filter-message="No projects found with given name"
      >
        <template #option="slotProps">
          <div>{{ slotProps.option.name }}</div>
          <button
            class="section__listbox__remove-button"
            @click="handleRemoveProject(slotProps.option)"
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
import type { Project } from '@/types/Project'
import ProgressSpinner from 'primevue/progressspinner'
import { useProjectsStore } from '@/stores/projects'

const employeeStore = useEmployeesStore()
const employeeDetails = computed(() => employeeStore.employeeDetails)
const employeeIdFromParams = router.currentRoute.value.params.id
const employeeAssignedProjects = computed(() => employeeStore.allEmployeeProjects)
const isFetchingEmployeeDetails = computed(() => employeeStore.isFetchingEmployeeDetails)
const projectsStore = useProjectsStore()
const availableProjects = computed(() => {
  if (employeeAssignedProjects.value) {
    const assignedProjectName = employeeAssignedProjects.value.map((project) => project.name)
    return projectsStore.allProjects.filter(
      (project) => !assignedProjectName.includes(project.name),
    )
  } else {
    return []
  }
})
const selectedProject = ref()

employeeStore.fetchEmployeeDetails(Number(employeeIdFromParams))
employeeStore.fetchEmployeeProjects(Number(employeeIdFromParams))
projectsStore.fetchAllProjects()

const handleProjectAssign = () => {
  const oldProjectsIds = employeeAssignedProjects.value.map((project) => project.id)
  const newProjectId = selectedProject.value.id
  const combinedProjectsIds = [...oldProjectsIds, newProjectId]
  employeeStore.modifyEmployeeProjects(Number(employeeIdFromParams), combinedProjectsIds)
  selectedProject.value = null
}

const handleRemoveProject = (project: Project) => {
  if (employeeDetails.value) {
    employeeStore.deleteProjectFromEmployee(employeeDetails.value, project)
    selectedProject.value = null
  }
}
</script>

<style lang="scss" scoped>
.manage-employee-projects {
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
