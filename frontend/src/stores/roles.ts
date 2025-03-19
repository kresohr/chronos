import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useRolesStore = defineStore('roles', () => {
  const toast = useToast()
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/roles`
  const allRoles = ref([
    { name: 'Developer', code: 'DEV' },
    { name: 'PM', code: 'PM' },
    { name: 'PO', code: 'PO' },
  ] as any)

  async function fetchAllRoles() {
    try {
      const response = await fetch(backendUrl)
      const data = await response.json()
      allRoles.value = data
    } catch (error) {
      console.error(error)
    }
  }

  return { allRoles, fetchAllRoles }
})
