import api from '@/plugin/api'
import type { InventorySchema } from '@/types/inventory.types'

export const useInventory = () => {
  const getAll = async () => {
    return await api
      .get('/')
      .then((res) => ({
        data: res.data,
      }))
      .catch((err) => {
        err
      })
  }

  const getById = async (id: string) => {
    return await api
      .get(`/inventory/${id}`)
      .then((res) => ({
        data: res.data,
      }))
      .catch((err) => {
        err
      })
  }

  const create = async (payload: InventorySchema) => {
    return await api
      .post(`/inventory`, payload)
      .then((res) => ({
        data: res.data,
      }))
      .catch((err) => {
        err
      })
  }

  const update = async (id: string, payload: Partial<InventorySchema>) => {
    return await api
      .post(`/inventory/${id}`, payload)
      .then((res) => ({
        data: res.data,
      }))
      .catch((err) => {
        err
      })
  }

  const destroy = async (id: string) => {
    return await api
      .delete(`/inventory/${id}`)
      .then((res) => ({
        success: res.status === 204,
      }))
      .catch((err) => {
        err
      })
  }

  return {
    getAll,
    getById,
    create,
    update,
    destroy,
  }
}
