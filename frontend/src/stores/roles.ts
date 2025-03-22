import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import type { Role } from '@/types/RoleType'

export const useRolesStore = defineStore('roles', () => {
  const toast = useToast()
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/roles`
  const allRoles = ref<Role[]>([])

  async function fetchAllRoles() {
    try {
      const response = await fetch(backendUrl)
      const data = await response.json()
      allRoles.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function createRole(name: string) {
    try {
      const newRole = { name }

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      })

      if (!response.ok) {
        throw new Error(`Failed to create role: ${response.statusText}`)
      }

      const createdRole = await response.json()

      toast.add({
        severity: 'success',
        summary: 'Role created successfully!',
        life: 3000,
      })

      allRoles.value.push(createdRole)
    } catch (error: any) {
      console.error('Error creating role:', error)

      toast.add({
        severity: 'error',
        summary: 'Failed to create role.',
        detail: error.message,
        life: 3000,
      })
    }
  }

  return { allRoles, fetchAllRoles, createRole }
})
