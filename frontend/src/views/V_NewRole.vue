<template>
  <h1>Create New Role</h1>
  <p>Enter the name of the new role</p>

  <section>
    <div class="create-role">
      <Form
        :initialValues
        :resolver="zodFormResolver"
        @submit="onFormSubmit"
        class="form-container"
      >
        <FormField v-slot="$field" name="name" initialValue="" class="form-field">
          <InputText type="text" placeholder="Role Name" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <Button type="submit" label="Create" />
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, FormField } from '@primevue/forms'
import { InputText, Button, Message } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { useRolesStore } from '@/stores/roles'
import { useRouter } from 'vue-router'

const rolesStore = useRolesStore()
const toast = useToast()
const router = useRouter()

const zodSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
})

const zodFormResolver = zodResolver(zodSchema)

const initialValues = {
  name: '',
}

const onFormSubmit = async ({ valid, values }: { valid: boolean; values?: any }) => {
  if (!valid || !values) {
    toast.add({
      severity: 'error',
      summary: 'Invalid Role Name.',
      life: 3000,
    })
    return
  }
  await rolesStore.createRole(values.name)
  router.push('/')
}
</script>

<style scoped lang="scss">
.create-role {
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
