import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user.types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User>()
    const logUser = (_user: User | undefined) => {
      user.value = _user
    }
    const isAuthenticated = computed(() => user.value !== undefined)

    return { user, isAuthenticated, logUser }
  },
  { persist: true },
)
