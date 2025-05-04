import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { StatisticsCount } from '@/types/Statistics'

export const useStatisticsStore = defineStore('statistics', () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/statistics`
  const totalCount = ref<StatisticsCount>({
    totalEntries: 0,
    totalProjects: 0,
    totalRoles: 0,
    totalUsers: 0,
  })

  async function getTotalCount() {
    try {
      const response = await fetch(`${backendUrl}/counts`)
      if (!response.ok) {
        throw new Error('Unable to get total count')
      }
      totalCount.value = await response.json()
    } catch (error) {
      console.error(error)
    }
  }
  return { getTotalCount, totalCount }
})
