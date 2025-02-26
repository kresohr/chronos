<template>
  <h1>Create New Employee</h1>
  <p>Fill out the form to create a new employee</p>

  <section>
    <div class="create-employee">
      <Form
        :initialValues
        :resolver="zodFormResolver"
        @submit="onFormSubmit"
        class="form-container"
      >
        <FormField v-slot="$field" name="email" initialValue="" class="form-field">
          <InputText type="text" placeholder="E-mail address" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="firstname" initialValue="" class="form-field">
          <InputText type="text" placeholder="First Name" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="lastname" initialValue="" class="form-field">
          <InputText type="text" placeholder="Last Name" class="form-field__input-text" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <!-- Add conditional render if role is enabled as a module -->
        <FormField v-if="true" v-slot="$field" name="role" class="form-field">
          <Dropdown
            v-model="selectedRole"
            :options="roles"
            optionLabel="name"
            placeholder="Select a Role"
          />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <!-- Add conditional render if project is enabled as a module -->
        <FormField v-if="true" v-slot="$field" name="role" class="form-field">
          <Dropdown
            v-model="selectedProject"
            :options="project"
            optionLabel="name"
            placeholder="Assign to project"
          />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <Button type="submit" label="Submit" />
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, FormField } from '@primevue/forms'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import { Button, InputText, Message } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { useEmployeeStore } from '@/stores/employee'

const employeeStore = useEmployeeStore()
const toast = useToast()
const zodSchema = z.object({
  email: z.string().email('Invalid email'),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  details: z.string().optional(),
})

const zodFormResolver = zodResolver(zodSchema)

const initialValues = {
  email: '',
  firstname: '',
  lastname: '',
  role: '',
}

const selectedRole = ref()
const roles = ref([
  { name: 'Developer', code: 'DEV' },
  { name: 'PM', code: 'PM' },
  { name: 'PO', code: 'PO' },
])

const selectedProject = ref()
const project = ref([
  { name: 'Project 1', code: 'P1' },
  { name: 'Project 2', code: 'P2' },
  { name: 'Project 3', code: 'P3' },
])

const onFormSubmit = async ({ valid, values }: { valid: boolean; values?: any }) => {
  if (valid && values) {
    try {
      await employeeStore.createEmployee(
        values.firstname,
        values.lastname,
        values.email,
        selectedRole.value.name,
        selectedProject.value.name,
      )
    } catch (error: any) {
      console.error(error)
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Form validation failed.',
      life: 3000,
    })
  }
}
</script>

<style scoped lang="scss">
.create-employee {
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
}
</style>
