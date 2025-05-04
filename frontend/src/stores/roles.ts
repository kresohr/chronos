import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import type { Role } from '@/types/Role'
import type { Employee } from '@/types/Employee'

export const useRolesStore = defineStore('roles', () => {
  const toast = useToast()
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/roles`
  const allRoles = ref<Role[]>([])
  const isFetchingRoleDetails = ref(false)
  const employeesWithRole = ref<Employee[]>([])
  const singleRoleDetails = ref<Role>()

  async function fetchAllRoles() {
    try {
      const response = await fetch(backendUrl)
      const data = await response.json()
      allRoles.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchRoleDetails(roleId: number) {
    try {
      const response = await fetch(`${backendUrl}/${roleId}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch details for role id: ${roleId} [${response.statusText}]`)
      }
      singleRoleDetails.value = await response.json()
    } catch (error: any) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: `Failed to fetch details for role id:${roleId}!`,
        life: 3000,
      })
    }
  }

  async function fetchEmployeesWithRole(roleId: number) {
    try {
      const response = await fetch(`${backendUrl}/${roleId}/employees`)
      if (!response.ok) {
        throw new Error(`Unable to fetch employees for role id: ${roleId} [${response.statusText}]`)
      }
      employeesWithRole.value = await response.json()
    } catch (error: any) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: `Failed to fetch employes with role id:${roleId}!`,
        life: 3000,
      })
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

  async function modifyRole(role: Role) {
    try {
      const response = await fetch(`${backendUrl}/${Number(role.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      })

      if (!response.ok) {
        throw new Error(`Failed to modify role with id:${role.id}!`)
      }
      toast.add({
        severity: 'success',
        summary: 'Role updated successfully!',
        life: 3000,
      })
      fetchRoleDetails(role.id!)
    } catch (error: any) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: 'Failed to update role',
        life: 3000,
      })
    }
  }

  return {
    allRoles,
    fetchAllRoles,
    createRole,
    isFetchingRoleDetails,
    employeesWithRole,
    fetchRoleDetails,
    singleRoleDetails,
    fetchEmployeesWithRole,
    modifyRole,
  }
})
