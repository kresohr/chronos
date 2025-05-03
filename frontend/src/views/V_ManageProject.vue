<template>
  <!-- TODO: Guard route if user is not admin -->
  <!-- TODO: Implement project removal button -->

  <h1>Manage Project</h1>
  <p>Modify {{ projectDetails?.name }} on this page</p>

  <div v-if="isFetchingProjectDetails" class="manage-project__spinner">
    <ProgressSpinner />
  </div>
  <section v-if="!isFetchingProjectDetails">
    <div class="manage-project">
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

    <!-- TODO: Implement employee removal method -->
    <div class="manage-project">
      <h2>Employees on this project</h2>

      <Listbox
        class="manage-project__listbox"
        :options="employeesOnProject"
        filter
        filter-placeholder="Search by name"
        optionLabel="firstName"
        empty-message="No employees assigned"
        empty-filter-message="No employees found with given name"
      >
        <template #option="slotProps">
          <div>{{ slotProps.option.firstName }}</div>
          <button
            class="manage-project__listbox__remove-button"
            @click="console.log('To implement removal.')"
          >
            <fa-icon :icon="['fas', 'xmark']" style="height: 20px; width: 20px" />
          </button>
        </template>
      </Listbox>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, FormField } from '@primevue/forms'
import { InputText, Button, Message } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import Listbox from 'primevue/listbox'
import { useProjectsStore } from '@/stores/projects'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

const projectsStore = useProjectsStore()
const toast = useToast()
const router = useRouter()
const projectIdFromParams = Number(router.currentRoute.value.params.id)
projectsStore.fetchProjectDetails(Number(projectIdFromParams))
const isFetchingProjectDetails = computed(() => projectsStore.isFetchingProjectDetails)
const projectDetails = computed(() => projectsStore.singleProjectDetails)
const employeesOnProject = computed(() => projectsStore.employeesOnProject)

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
  await projectsStore.modifyProject(values.name, projectIdFromParams)
}

onMounted(() => {
  projectsStore.fetchEmployeesOnProject(projectIdFromParams)
})
</script>

<style scoped lang="scss">
.manage-project {
  margin-top: var(--spacing-large);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: var(--spacing-small);
  width: 100%;
  max-width: 320px;

  &__spinner {
    display: flex;
    justify-content: center;
    margin-inline: auto;
    height: 50px;
    width: 50px;
  }

  Button {
    margin-left: auto;
  }

  &__listbox {
    width: 100%;

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
