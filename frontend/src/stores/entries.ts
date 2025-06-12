import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import type { Entry } from '@/types/Entry'

export const useEntriesStore = defineStore('entries', () => {
  const toast = useToast()
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/entries`
  const allEmployeeEntries = ref<Array<Entry>>([])

  async function fetchEmployeeEntries(employeeId: Number) {
    try {
      const response = await fetch(`${backendUrl}/${employeeId}`)
      const data = await response.json()
      allEmployeeEntries.value = data
    } catch (error) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: `Failed to fetch employee entries!`,
        life: 3000,
      })
    }
  }

  async function createEntry(entryData: Entry) {
    try {
      const response = await fetch(`${backendUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      })

      if (!response.ok) {
        throw new Error(`Failed to add new entry: ${response.statusText}`)
      }

      const createdEntry = await response.json()
      allEmployeeEntries.value.push(createdEntry)
      toast.add({
        severity: 'success',
        summary: 'Entry added successfully!',
        life: 3000,
      })
    } catch (error: any) {
      console.error('Error adding entry:', error)

      toast.add({
        severity: 'error',
        summary: 'Failed to add entry.',
        detail: error.message,
        life: 3000,
      })
    }
  }

  return { fetchEmployeeEntries, createEntry, allEmployeeEntries }
})
