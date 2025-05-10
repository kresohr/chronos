<template>
  <!-- TODO: Guard route if user is not admin -->
  <h1>Add Log</h1>
  <p>Keep track of time spent on each project</p>

  <!-- TODO: Fix zod validation when writing text in search -->
  <section>
    <div class="new-log">
      <Form
        :initialValues
        :resolver="zodFormResolver"
        @submit="onFormSubmit"
        class="form-container"
      >
        <!-- Add conditional render if project is enabled as a module -->
        <FormField v-slot="$field" name="project" class="form-field">
          <label for="project-picker" class="new-log__time--label"
            >1. Select a project from the list</label
          >
          <Select
            id="project-picker"
            v-model="selectedProject"
            :options="projects"
            optionLabel="name"
            placeholder="Projects"
            :filter="true"
            filterPlaceholder="Search available projects"
          >
          </Select>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="date" class="new-log__time--wrapper">
          <label for="date" class="new-log__time--label">2. Select the date</label>
          <DatePicker
            id="date"
            class="new-log__time--datepicker"
            v-model="selectedDate"
            dateFormat="dd/mm/yy"
            placeholder="Select the date..."
          />
        </FormField>

        <FormField v-slot="$field" name="time" class="new-log__time--wrapper">
          <label for="time" class="new-log__time--label">3. Enter the amount of hours</label>
          <CustomTimeInput
            :selected-hour="selectedHour"
            :selected-minutes="selectedMinutes"
            @hours="(hours) => (selectedHour = hours)"
            @minutes="(minutes) => (selectedMinutes = minutes)"
          ></CustomTimeInput>
        </FormField>

        <Button :disabled="isDataInvalid" type="submit" label="Log" />
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, FormField } from '@primevue/forms'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import CustomTimeInput from '@/components/C_CustomTimeInput.vue'
import { computed, onMounted, ref } from 'vue'
import { Button, Message } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()
const toast = useToast()
const zodSchema = z.object({
  project: z.object({
    id: z.number(),
  }),
})

const zodFormResolver = zodResolver(zodSchema)

const initialValues = {
  project: {
    id: null,
  },
}

const selectedProject = ref<{ id: number } | null>(null)
const projects = computed(() => projectsStore.allProjects)
const selectedDate = ref()
const selectedHour = ref(8)
const selectedMinutes = ref(0)

const isDataInvalid = computed((): boolean => {
  if (selectedHour.value === 0 && selectedMinutes.value === 0) {
    return true
  }

  if (!selectedProject.value) {
    return true
  }

  if (!selectedDate.value) {
    return true
  }

  return false
})

const onFormSubmit = async ({ valid, values }: { valid: boolean; values?: any }) => {
  if (!valid) {
    toast.add({
      severity: 'error',
      summary: 'Form validation failed.',
      life: 3000,
    })
    return
  } else if (!values) {
    toast.add({
      severity: 'error',
      summary: 'Please fill out all the fields',
      life: 3000,
    })
  } else {
    // TODO: Implement onFormSubmit method
  }
}

onMounted(() => {
  projectsStore.fetchAllProjects()
})
</script>

<style scoped lang="scss">
.new-log {
  margin-top: var(--spacing-large);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: var(--spacing-small);

  &__time {
    &--wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
    }

    &--label {
      font-weight: bold;
    }

    &--datepicker {
      textarea {
        text-align: center;
      }
      ::placeholder {
        text-align: center;
      }
    }
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
</style>
