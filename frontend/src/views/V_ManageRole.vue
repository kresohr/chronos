<template>
  <!-- TODO: Guard route if user is not admin -->
  <!-- TODO: Implement role removal button -->

  <h1>Manage Role</h1>
  <p>Modify {{ roleDetails?.name }} on this page</p>

  <div v-if="isFetchingRoleDetails" class="manage-role__spinner">
    <ProgressSpinner />
  </div>
  <section v-if="!isFetchingRoleDetails">
    <div class="manage-role">
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

        <Button type="submit" label="Save" />
      </Form>
    </div>

    <!-- TODO: Implement employee removal method -->
    <!-- TODO: Implement employee add method -->

    <div class="manage-role">
      <h2>Employees assigned to this role</h2>
      <!-- TODO: Implement removal -->
      <Listbox
        class="manage-role__listbox"
        :options="employeesWithRole"
        filter
        filter-placeholder="Search by name"
        optionLabel="firstName"
        empty-message="No employees assigned"
        empty-filter-message="No employees found with given name"
      >
        <template #option="slotProps">
          <div>{{ slotProps.option.firstName }}</div>
          <button
            class="manage-role__listbox__remove-button"
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
import { useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useRolesStore } from '@/stores/roles'

const rolesStore = useRolesStore()
const toast = useToast()
const router = useRouter()
const roleIdFromParams = Number(router.currentRoute.value.params.id)
rolesStore.fetchRoleDetails(Number(roleIdFromParams))
const isFetchingRoleDetails = computed(() => rolesStore.isFetchingRoleDetails)
const roleDetails = computed(() => rolesStore.singleRoleDetails)
const employeesWithRole = computed(() => rolesStore.employeesWithRole)

const zodSchema = z.object({
  name: z
    .string()
    .min(2, 'Role name cannot be shorter than 2 characters')
    .max(35, 'Role name cannot be longer than 35 characters'),
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
  const dto = {
    id: roleIdFromParams,
    name: values.name,
  }
  await rolesStore.modifyRole(dto)
}

onMounted(() => {
  rolesStore.fetchEmployeesWithRole(roleIdFromParams)
})

watch(employeesWithRole, () => {
  console.log(employeesWithRole.value)
})
</script>

<style scoped lang="scss">
.manage-role {
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
