import type { Project } from '@/types/ProjectType'
import { defineStore } from 'pinia'
import { useToast } from 'primevue'
import { ref } from 'vue'

export const useProjectsStore = defineStore('projects', () => {
  const toast = useToast()
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/projects`
  const allProjects = ref<Project[]>([])

  async function fetchAllProjects() {
    try {
      const response = await fetch(backendUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`)
      }
      const data = await response.json()
      allProjects.value = data
    } catch (error: any) {
      console.error('Error fetching projects:', error)
      toast.add({
        severity: 'error',
        summary: 'Failed to fetch projects.',
        detail: error.message,
        life: 3000,
      })
    }
  }

  async function createProject(name: string) {
    try {
      const newProject = { name }
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      if (!response.ok) {
        throw new Error(`Failed to create project: ${response.statusText}`)
      }

      const createdProject = await response.json()

      toast.add({
        severity: 'success',
        summary: 'Project created successfully!',
        life: 3000,
      })

      allProjects.value.push(createdProject)
    } catch (error: any) {
      console.error('Error creating project:', error)
      toast.add({
        severity: 'error',
        summary: 'Failed to create project.',
        detail: error.message,
        life: 3000,
      })
    }
  }

  async function deleteProject(id: number) {
    try {
      const deleteProject = { id }
      const response = await fetch(backendUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteProject),
      })

      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`)
      }

      toast.add({
        severity: 'success',
        summary: 'Project deleted successfully!',
        life: 3000,
      })

      allProjects.value = allProjects.value.filter((project) => project.id !== id)
    } catch (error: any) {
      console.error('Error deleting project:', error)
      toast.add({
        severity: 'error',
        summary: 'Failed to delete project.',
        detail: error.message,
        life: 3000,
      })
    }
  }

  return { allProjects, fetchAllProjects, createProject, deleteProject }
})
