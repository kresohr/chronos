import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import type { Employee } from '@/types/EmployeeType'
import type { Project } from '@/types/ProjectType'

export const useEmployeesStore = defineStore('employees', () => {
  const toast = useToast()
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/employees`
  const allEmployees = ref<Employee[]>([])
  const allEmployeeProjects = ref<Project[]>([])
  const isFetchingEmployeeDetails = ref(false)

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
    roleId: number | null,
    projectId: number | null,
    isAdmin: boolean,
  ) {
    try {
      const newEmployee = {
        firstName,
        lastName,
        email,
        roleId,
        projectId,
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

  async function fetchEmployeeProjects(employee: Employee) {
    try {
      const response = await fetch(`${backendUrl}/${employee.id}/projects/`)
      const data = await response.json()
      allEmployeeProjects.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteEmployee(employee: Employee) {
    try {
      await fetch(`${backendUrl}/${employee.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchEmployeeDetails(employeeId: Number) {
    try {
      isFetchingEmployeeDetails.value = true
      await fetch(`${backendUrl}/${employeeId}`)
    } catch (error) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: `Failed to fetch employee details!`,
        life: 3000,
      })
    } finally {
      isFetchingEmployeeDetails.value = false
    }
  }

  async function deleteProjectFromEmployee(employee: Employee, project: Project) {
    try {
      const response = await fetch(`${backendUrl}/${employee.id}/projects/${project.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`)
      }
      toast.add({
        severity: 'success',
        summary: `${employee.email} removed from project ${project.name}!`,
        life: 3000,
      })
      fetchEmployeeProjects(employee)
    } catch (error) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: `Failed to remove employee from project ${project.name}!`,
        life: 3000,
      })
    }
  }

  return {
    allEmployees,
    allEmployeeProjects,
    fetchAllEmployees,
    createEmployee,
    fetchEmployeeProjects,
    deleteProjectFromEmployee,
    deleteEmployee,
    fetchEmployeeDetails,
  }
})
