<template>
  <!-- TODO: Guard route if user is not admin -->

  <h1>Manage Project</h1>
  <p>Modify {{}} on this page</p>

  <section>
    <div class="create-project">
      <Form
        :initialValues
        :resolver="zodFormResolver"
        @submit="onFormSubmit"
        class="form-container"
      >
        <FormField v-slot="$field" name="name" initialValue="" class="form-field">
          <InputText type="text" placeholder="Project Name" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <Button type="submit" label="Save" />
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
import { useProjectsStore } from '@/stores/projects' // Import project store
import { useRouter } from 'vue-router'

const projectsStore = useProjectsStore() // Use project store
const toast = useToast()
const router = useRouter()

const zodSchema = z.object({
  name: z
    .string()
    .min(2, 'Project name cannot be shorter than 2 characters')
    .max(35, 'Project name cannot be longer than 35 characters'),
})

const zodFormResolver = zodResolver(zodSchema)

const initialValues = {
  name: '',
}

const onFormSubmit = async ({ valid, values }: { valid: boolean; values?: any }) => {
  if (!valid || !values) {
    toast.add({
      severity: 'error',
      summary: 'Invalid Project Name.',
      life: 3000,
    })
    return
  }
  const projectIdFromParams = Number(router.currentRoute.value.params.id)
  await projectsStore.modifyProject(values.name, projectIdFromParams)
}
</script>

<style scoped lang="scss">
.create-project {
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
