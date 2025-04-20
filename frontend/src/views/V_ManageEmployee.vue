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
            placeholder="Select a Role"
            :filter="true"
            filterPlaceholder="Search available roles"
          >
            <template #option="slotProps">
              <span :class="{ 'create-new-item': slotProps.option.isCreateNew }">
                {{ slotProps.option.name }}
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
            placeholder="Assign to project"
            :filter="true"
            filterPlaceholder="Search available projects"
          >
            <template #option="slotProps">
              <span :class="{ 'create-new-item': slotProps.option.isCreateNew }">
                {{ slotProps.option.name }}
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
        <Button type="submit" label="Submit" />
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, FormField } from '@primevue/forms'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import { computed, ref, watch } from 'vue'
import { Button, InputText, Message } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { useEmployeesStore } from '@/stores/employees'
import router from '@/router'
import { useProjectsStore } from '@/stores/projects'

const employeeStore = useEmployeesStore()
const projectsStore = useProjectsStore()
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
      name: 'Create New Role',
      isCreateNew: true,
    },
    ...employeeRoles.value,
  ]
})

const selectedProject = ref()
const projects = computed(() => {
  const allProjects = projectsStore.allProjects
  return [
    {
      name: 'Create New Project',
      isCreateNew: true,
    },
    ...allProjects,
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
