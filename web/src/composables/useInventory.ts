import api from '@/plugin/api'
import type { InventoryItem, InventorySchema } from '@/types/inventory.types'

export const useInventory = () => {
  const getAll = async () => {
    return await api.get('/inventory')
  }

  const getById = async (id: string) => {
    return await api.get(`/inventory/${id}`)
  }

  const create = async (payload: InventorySchema) => {
    return await api.post(`/inventory`, payload)
  }

  const update = async (id: string, payload: Partial<InventorySchema>) => {
    return await api.post(`/inventory/${id}`, payload)
  }

  const destroy = async (id: string) => {
    return await api.delete(`/inventory/${id}`)
  }

  return {
    getAll,
    getById,
    create,
    update,
    destroy,
  }
}
