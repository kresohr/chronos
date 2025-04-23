<template>
  <!-- TODO: Guard route if user is not admin -->
  <h1>Manage Employee</h1>
  <p>Edit all details for {{ employeeDetails?.email }}</p>

  <section>
    <div class="manage-employee">
      <!-- TODO: Check how to update PrimeVue Form component fields after employeeDetails is fetched. -->
      <Form
        :initialValues="formValues"
        :resolver="zodFormResolver"
        @submit="onFormSubmit"
        class="form-container"
      >
        <FormField v-slot="$field" name="email" class="form-field">
          <InputText type="text" placeholder="E-mail address" v-model="formValues.email" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="firstname" class="form-field">
          <InputText type="text" placeholder="First Name" v-model="formValues.firstname" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="lastname" initialValue="" class="form-field">
          <InputText
            type="text"
            placeholder="Last Name"
            class="form-field__input-text"
            v-model="formValues.lastname"
          />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <!-- TODO: Prefetch roles and projects for user -->
        <!-- Add conditional render if role is enabled as a module -->
        <FormField v-if="true" v-slot="$field" name="role" class="form-field">
          <Dropdown
            v-model="formValues.role"
            :options="roles"
            optionLabel="name"
            placeholder="Assigned Roles"
            :filter="true"
            filterPlaceholder="Search available roles"
          >
            <template #option="slotProps">
              <span
                :class="[
                  { 'create-new-item': slotProps.option.isCreateNew },
                  { 'manage-employee__dropdown-row': !slotProps.option.isCreateNew },
                ]"
              >
                {{ slotProps.option.name }}
                <button
                  v-if="!slotProps.option.isCreateNew"
                  class="manage-employee__icon-button"
                  @click="handleRemoveRole(slotProps.option)"
                >
                  <fa-icon :icon="['fas', 'xmark']" style="height: 20px; width: 20px" />
                </button>
              </span>
            </template>
          </Dropdown>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <!-- Add conditional render if project is enabled as a module -->
        <FormField v-if="true" v-slot="$field" name="project" class="form-field">
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Assigned Projects"
            :filter="true"
            filterPlaceholder="Search available projects"
          >
            <template #option="slotProps">
              <span
                :class="[
                  { 'create-new-item': slotProps.option.isCreateNew },
                  { 'manage-employee__dropdown-row': !slotProps.option.isCreateNew },
                ]"
              >
                {{ slotProps.option.name }}
                <button
                  v-if="!slotProps.option.isCreateNew"
                  class="manage-employee__icon-button"
                  @click="handleRemoveProject(slotProps.option)"
                >
                  <fa-icon :icon="['fas', 'xmark']" style="height: 20px; width: 20px" />
                </button>
              </span>
            </template>
          </Dropdown>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-if="true" v-slot="$field" name="isadmin" class="form-field--checkbox">
          <label for="isadmin">Admin privileges</label>
          <Checkbox inputId="isadmin" v-model="createAdminChecked" binary />
        </FormField>
        <Button type="submit" label="Save" />
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import router from '@/router'
import { Form, FormField } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import { Button, InputText, Message } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { z } from 'zod'
import type { Role } from '@/types/RoleType'
import type { Project } from '@/types/ProjectType'
import { useEmployeesStore } from '@/stores/employees'

const employeeStore = useEmployeesStore()
const toast = useToast()
const zodSchema = z.object({
  email: z.string().email('Invalid email'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  role: z.object({
    id: z.number(),
  }),
  project: z.object({
    id: z.number(),
  }),
  isadmin: z.boolean().optional(),
})

const zodFormResolver = zodResolver(zodSchema)
const employeeIdFromParams = router.currentRoute.value.params.id
employeeStore.fetchEmployeeDetails(Number(employeeIdFromParams))
employeeStore.fetchEmployeeRoles(Number(employeeIdFromParams))
employeeStore.fetchEmployeeProjects(Number(employeeIdFromParams))

const employeeDetails = computed(() => employeeStore.employeeDetails)

const formValues = ref({
  email: '',
  firstname: '',
  lastname: '',
  role: [{}],
  project: '',
  isadmin: false,
})

const roles = computed(() => {
  const employeeRoles = computed(() => employeeStore.allEmployeeRoles)
  return [
    {
      name: 'Assign New Role',
      isCreateNew: true,
    },
    ...employeeRoles.value,
  ]
})

const selectedProject = ref()
const projects = computed(() => {
  const employeeProjects = employeeStore.allEmployeeProjects
  return [
    {
      name: 'Assign New Project',
      isCreateNew: true,
    },
    ...employeeProjects,
  ]
})

const createAdminChecked = ref(false)

const onFormSubmit = async ({ valid, values }: { valid: boolean; values?: any }) => {
  if (!valid || !values) {
    toast.add({
      severity: 'error',
      summary: 'Form validation failed.',
      life: 3000,
    })
    return
  }

  await employeeStore.createEmployee(
    values.firstname,
    values.lastname,
    values.email,
    Number(values.role?.id) ?? null,
    Number(values.project?.id) ?? null,
    values.isadmin,
  )
}

const handleRemoveProject = (selectedProject: Project) => {
  if (employeeDetails.value) {
    employeeStore.deleteProjectFromEmployee(employeeDetails.value, selectedProject)
  }
}

const handleRemoveRole = (selectedRole: Role) => {
  if (employeeDetails.value) {
    employeeStore.deleteRoleFromEmployee(employeeDetails.value, selectedRole)
  }
}

watch(employeeDetails, () => {
  if (employeeDetails.value) {
    formValues.value = {
      email: employeeDetails.value.email,
      firstname: employeeDetails.value.firstName,
      lastname: employeeDetails.value.lastName,
      role: [{}],
      project: '',
      isadmin: false,
    }
  }
})
</script>

<style scoped lang="scss">
.manage-employee {
  margin-top: var(--spacing-large);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: var(--spacing-small);

  &__icon-button {
    background: none;
    border: none;
    cursor: pointer;
    :hover {
      transition: color 0.2s;
      color: var(--primary-button-color);
    }
  }
  &__dropdown-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-inline: 20px;
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-medium);
  width: 100%;
  max-width: 320px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xsmall);
  &--checkbox {
    display: flex;
    justify-content: end;
    gap: var(--spacing-small);
  }
}

.create-new-item {
  background-color: var(--p-button-primary-background);
  margin-inline: auto;
  color: var(--p-button-primary-color);
  padding: var(--p-button-padding-y) var(--p-button-padding-x);
  border-radius: 6px;
}
</style>
