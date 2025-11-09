import api from '@/plugin/api'
import type { LoginSchema, RegisterSchema } from '@/types/auth.types'

export const useAuth = () => {
  const login = async (payload: LoginSchema) => {
    return await api.post('/login', payload)
  }
  const register = async (payload: RegisterSchema) => {
    return await api.post('/register', payload)
  }
  const logout = async () => {
    return await api.post('/logout')
  }

  return {
    login,
    register,
    logout,
  }
}
