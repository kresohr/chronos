<template>
  <h1>Create New Employee</h1>
  <p>Create new employee and add it to a project</p>

  <section>
    <div class="create-employee">
      <Form
        :initialValues
        :resolver="zodFormResolver"
        @submit="console.log('Form submitted')"
        class="form-container"
      >
        <!-- TODO: Input text style has to be changed -->

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

        <!-- Input text has to be changed to dropdown to select available roles -->
        <FormField v-slot="$field" name="role" class="form-field">
          <InputText type="text" placeholder="User role" />
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
import { onMounted, ref } from 'vue'
import { onUnmounted } from 'vue'
import { Button, InputText, Password, Textarea, Message } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
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

const windowWidth = ref(window.innerWidth)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
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
