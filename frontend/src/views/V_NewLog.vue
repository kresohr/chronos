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
      <DataTable
        :value="allEmployeeEntries"
        :rows="5"
        :paginator="true"
        :style="[{ width: '100%' }]"
        v-model:filters="filters"
        v-if="allEmployeeEntries.length > 0"
        class="new-log__hours-logged"
      >
        <template #header>
          <div class="new-log__search">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>
        <Column field="project.name" header="Project" sortable style="text-align: center"></Column>
        <Column field="timeLogged" header="Project" sortable>
          <template #body="slotProps">
            {{ formatMinutesToHHmm(slotProps.data.timeLogged) }}
          </template>
        </Column>

        <!-- TODO: Conditionally render if the person is admin & module is enabled -->
        <!-- TODO: Implement removal -->
        <Column v-if="true" class="projects__edit-column" field="edit" header="Remove">
          <template #body="data">
            <router-link
              :to="`/projects/manage/${data.data.id}`"
              class="projects__icon-button--link"
            >
              <button class="new-log__remove-button" @click="console.log('To implement removal.')">
                <fa-icon :icon="['fas', 'xmark']" style="height: 20px; width: 20px" />
              </button>
            </router-link>
          </template>
        </Column>

        <ColumnGroup type="footer">
          <Row>
            <Column footer="Total Hours Tracked:" footerStyle="text-align:right" />
            <Column :footer="employeeEntriesTotalHours" footerStyle="text-align:center" />
            <Column />
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Form, FormField } from '@primevue/forms'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Row from 'primevue/row'
import ColumnGroup from 'primevue/columngroup'
import { FilterMatchMode } from '@primevue/core/api'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import CustomTimeInput from '@/components/C_CustomTimeInput.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { Button, Message, IconField, InputIcon, InputText } from 'primevue'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { useProjectsStore } from '@/stores/projects'
import { useEntriesStore } from '@/stores/entries'
import { formatMinutesToHHmm } from '@/utils/formatMinutesToHHmm'

const projectsStore = useProjectsStore()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
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
const entriesStore = useEntriesStore()
const allEmployeeEntries = computed(() => entriesStore.allEmployeeEntries)
/* TODO: Filter for selected date hours only */
const employeeEntriesTotalHours = computed(() => {
  return formatMinutesToHHmm(
    allEmployeeEntries.value.reduce((accumulator, entry) => accumulator + entry.timeLogged, 0),
  )
})

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
    console.log('POO')
  }
}

onMounted(() => {
  projectsStore.fetchAllProjects()
  entriesStore.fetchEmployeeEntries(8)
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

  &__remove-button {
    background: none;
    border: none;
    cursor: pointer;
    :hover {
      transition: color 0.2s;
      color: var(--primary-button-color);
    }
  }

  &__search {
    display: flex;
    justify-content: end;
  }

  &__hours-logged {
    margin-top: var(--spacing-large);
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
