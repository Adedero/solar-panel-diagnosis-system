import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const results = ref(JSON.parse(sessionStorage.getItem('results')) || [])

  function setResults(value) {
    results.value = sessionStorage.setItem('results', JSON.stringify(value))
  }

  return { results, setResults }
})
