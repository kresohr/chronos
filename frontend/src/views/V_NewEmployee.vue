<template>
  <h1>Create New Employee</h1>
  <p>Create new employee and add it to a project</p>

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

        <FormField v-slot="$field" name="role" class="form-field">
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

        <Button type="submit" label="Submit" />
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, FormField } from '@primevue/forms'
import Dropdown from 'primevue/dropdown'
import { ref } from 'vue'
import { Button, InputText, Password, Textarea, Message } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'

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
const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Form was not submitted.',
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
