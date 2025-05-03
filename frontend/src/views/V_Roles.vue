<template>
  <h1>Roles</h1>
  <p>View full list of roles</p>

  <section>
    <div class="roles">
      <DataTable
        :value="roleStore.allRoles"
        :rows="5"
        :paginator="true"
        :style="[{ width: '100%' }]"
        v-model:filters="filters"
        v-if="roleStore.allRoles.length > 0"
      >
        <template #header v-if="windowWidth > 600">
          <div class="roles__search">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
          </div>
        </template>
        <Column field="id" header="#" sortable></Column>
        <Column field="name" header="Name" sortable></Column>

        <!-- TODO: Conditionally render if the person is admin & module is enabled -->
        <!-- TODO: Implement a navigation to new edit page where roles can be modified or deleted -->
        <Column v-if="true" class="roles__edit-column" field="edit" header="Edit">
          <template #body="data">
            <router-link :to="`/roles/manage/${data.data.id}`" class="roles__icon-button--link">
              <button class="roles__icon-button">
                <fa-icon :icon="['fas', 'pencil']" />
              </button>
            </router-link>
          </template>
        </Column>
      </DataTable>
      <p v-if="roleStore.allRoles.length == 0" class="roles__no-results">No roles found.</p>

      <router-link class="roles__new-role-button--wrapper" to="/roles/new">
        <!-- TODO: Conditionally render if the person is admin -->
        <Button label="Create New" v-if="true" />
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import { FilterMatchMode } from '@primevue/core/api'
import Column from 'primevue/column'
import { Button, IconField, InputIcon, InputText } from 'primevue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRolesStore } from '@/stores/roles'

const roleStore = useRolesStore()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const windowWidth = ref(window.innerWidth)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
  roleStore.fetchAllRoles()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped lang="scss">
.roles {
  margin-top: var(--spacing-large);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: var(--spacing-small);

  &__no-results {
    text-decoration: underline;
  }

  &__search {
    display: flex;
    justify-content: end;
  }

  &__new-role-button {
    &--wrapper {
      margin-top: var(--spacing-small);
      margin-left: auto;
    }
  }

  &__icon-button {
    all: unset;
    cursor: pointer;
    display: block;
    margin-inline: auto;

    &--link {
      all: unset;
    }
  }

  @media screen and (min-width: 1300px) {
    max-width: 1000px;
  }
}

:deep(.roles__edit-column .p-datatable-column-header-content) {
  align-items: center;
  justify-content: center;
}
</style>
