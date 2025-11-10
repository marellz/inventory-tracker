import api from '@/plugin/api'
import type { LoginSchema, RegisterSchema } from '@/types/auth.types'

export const useAuth = () => {
  const login = async (payload: LoginSchema) => {
    return await api.post('/auth/login', payload)
  }
  const register = async (payload: RegisterSchema) => {
    return await api.post('/auth/register', payload)
  }
  const logout = async () => {
    return await api.post('/auth/logout')
  }

  return {
    login,
    register,
    logout,
  }
}
