import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useEmployeesStore = defineStore('employees', () => {
  const toast = useToast()
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/employees`
  const allEmployees = ref([
    { name: 'John', lastname: 'Doe', email: 'oRq7w@example.com' },
    { name: 'John', lastname: 'Doe', email: 'oRq7w@example.com' },
    { name: 'John', lastname: 'Doe', email: 'oRq7w@example.com' },
    { name: 'John', lastname: 'Doe', email: 'oRq7w@example.com' },
    { name: 'John', lastname: 'Doe', email: 'oRq7w@example.com' },
    { name: 'John', lastname: 'Doe', email: 'oRq7w@example.com' },
    { name: 'John', lastname: 'Doe', email: 'oRq7w@example.com' },
  ] as any)

  async function fetchAllEmployees() {
    try {
      const response = await fetch(backendUrl)
      const data = await response.json()
      allEmployees.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function createEmployee(
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    project: string,
    isAdmin: boolean,
  ) {
    try {
      const newEmployee = {
        firstName,
        lastName,
        email,
        role,
        project,
        isAdmin,
      }

      const response = await fetch(`${backendUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      })

      if (!response.ok) {
        throw new Error(`Failed to create employee: ${response.statusText}`)
      }

      const createdEmployee = await response.json()

      toast.add({
        severity: 'success',
        summary: 'Employee created successfully!',
        life: 3000,
      })

      allEmployees.value.push(createdEmployee)
    } catch (error: any) {
      console.error('Error creating employee:', error)

      toast.add({
        severity: 'error',
        summary: 'Failed to create employee.',
        detail: error.message,
        life: 3000,
      })
    }
  }

  return { allEmployees, fetchAllEmployees, createEmployee }
})
