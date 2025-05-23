<template>
  <!-- TODO: Guard route if user is not admin -->
  <h1>Manage Employee</h1>
  <p>Edit all details for {{ employeeDetails?.email }}</p>

  <section>
    <div class="manage-employee">
      <Form
        v-if="employeeDetails"
        :initialValues="initialValues"
        :resolver="zodFormResolver"
        @submit="onFormSubmit"
        class="form-container"
      >
        <FormField v-slot="$field" class="form-field">
          <InputText type="text" placeholder="E-mail address" name="email" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" class="form-field">
          <InputText type="text" placeholder="First Name" name="firstname" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" class="form-field">
          <InputText
            name="lastname"
            type="text"
            placeholder="Last Name"
            class="form-field__input-text"
          />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <!-- Add conditional render if role is enabled as a module -->
        <FormField v-if="true" v-slot="$field" class="form-field">
          <Select
            v-model="selectedRole"
            name="role"
            :options="roles"
            optionLabel="name"
            placeholder="Assigned Roles"
            :filter="true"
            filterPlaceholder="Search available roles"
          >
            <template #option="slotProps">
              <span
                :class="[
                  { 'assign-new': slotProps.option.isButton },
                  { 'manage-employee__dropdown-row': !slotProps.option.isButton },
                ]"
              >
                {{ slotProps.option.name }}
                <button
                  v-if="!slotProps.option.isButton"
                  class="manage-employee__icon-button"
                  @click.stop="handleRemoveRole(slotProps.option)"
                >
                  <fa-icon :icon="['fas', 'xmark']" style="height: 20px; width: 20px" />
                </button>
              </span>
            </template>
          </Select>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <!-- Add conditional render if project is enabled as a module -->
        <FormField v-if="true" v-slot="$field" class="form-field">
          <Select
            v-model="selectedProject"
            name="project"
            :options="projects"
            optionLabel="name"
            placeholder="Assigned Projects"
            :filter="true"
            filterPlaceholder="Search available projects"
          >
            <template #option="slotProps">
              <span
                :class="[
                  { 'assign-new': slotProps.option.isButton },
                  { 'manage-employee__dropdown-row': !slotProps.option.isButton },
                ]"
              >
                {{ slotProps.option.name }}
                <button
                  v-if="!slotProps.option.isButton"
                  class="manage-employee__icon-button"
                  @click.stop="handleRemoveProject(slotProps.option)"
                >
                  <fa-icon :icon="['fas', 'xmark']" style="height: 20px; width: 20px" />
                </button>
              </span>
            </template>
          </Select>
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
import { computed, onMounted, ref, watch } from 'vue'
import router from '@/router'
import { Form, FormField } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import { Button, InputText, Message } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { z } from 'zod'
import type { Role } from '@/types/Role'
import type { Project } from '@/types/Project'
import { useEmployeesStore } from '@/stores/employees'

const employeeStore = useEmployeesStore()
const toast = useToast()
const zodSchema = z.object({
  email: z.string().email('Invalid email'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  role: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().optional(),
      }),
    )
    .optional(),
  project: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().optional(),
      }),
    )
    .optional(),
  isadmin: z.boolean().optional(),
})

const zodFormResolver = zodResolver(zodSchema)
const employeeIdFromParams = router.currentRoute.value.params.id
onMounted(() => {
  employeeStore.fetchEmployeeDetails(Number(employeeIdFromParams))
})
employeeStore.fetchEmployeeRoles(Number(employeeIdFromParams))
employeeStore.fetchEmployeeProjects(Number(employeeIdFromParams))

const employeeDetails = computed(() => employeeStore.employeeDetails)

const initialValues = ref({
  email: '',
  firstname: '',
  lastname: '',
  role: [{}],
  project: [{}],
  isadmin: false,
})

const roles = computed(() => {
  const employeeRoles = computed(() => employeeStore.allEmployeeRoles)
  return [
    {
      name: 'Assign New Role',
      isButton: true,
    },
    ...employeeRoles.value,
  ]
})

const projects = computed(() => {
  const employeeProjects = employeeStore.allEmployeeProjects
  return [
    {
      name: 'Assign New Project',
      isButton: true,
    },
    ...employeeProjects,
  ]
})

const createAdminChecked = ref(false)
const selectedRole = ref()
const selectedProject = ref()

const onFormSubmit = async ({ valid, values }: { valid: boolean; values?: any }) => {
  if (valid && values) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
    await employeeStore.modifyEmployee({
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      isAdmin: values.isadmin,
      id: employeeDetails.value?.id,
    })
  } else toast.add({ severity: 'error', summary: 'Error: Double-check all fields', life: 3000 })
}

const handleRemoveProject = (project: Project) => {
  if (employeeDetails.value) {
    employeeStore.deleteProjectFromEmployee(employeeDetails.value, project)
    selectedProject.value = null
  }
}

const handleRemoveRole = (role: Role) => {
  if (employeeDetails.value) {
    employeeStore.deleteRoleFromEmployee(employeeDetails.value, role)
    selectedRole.value = null
  }
}

if (employeeDetails.value) {
  initialValues.value = {
    email: employeeDetails.value.email || '',
    firstname: employeeDetails.value.firstName || '',
    lastname: employeeDetails.value.lastName || '',
    role: [],
    project: [],
    isadmin: employeeDetails.value.isAdmin || false,
  }
}

watch(employeeDetails, (newEmployeeDetails) => {
  if (newEmployeeDetails) {
    initialValues.value = {
      email: newEmployeeDetails.email || '',
      firstname: newEmployeeDetails.firstName || '',
      lastname: newEmployeeDetails.lastName || '',
      role: [],
      project: [],
      isadmin: newEmployeeDetails.isAdmin || false,
    }
  }
})

watch(selectedRole, () => {
  if (selectedRole.value?.isButton) {
    router.push(`/employees/manage/${employeeIdFromParams}/roles`)
  }
})

watch(selectedProject, () => {
  if (selectedProject.value?.isButton) {
    router.push(`/employees/manage/${employeeIdFromParams}/projects`)
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

.assign-new {
  background-color: var(--p-button-primary-background);
  margin-inline: auto;
  color: var(--p-button-primary-color);
  padding: var(--p-button-padding-y) var(--p-button-padding-x);
  border-radius: 6px;
}
</style>
