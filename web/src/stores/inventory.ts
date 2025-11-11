import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { InventoryItem, InventorySchema } from '@/types/inventory.types'
import { useInventory } from '@/composables/useInventory'

export const useInventoryStore = defineStore(
  'inventory',
  () => {
    const service = useInventory()
    const items = ref<InventoryItem[]>([])

    const getAll = async () => {
      const { data } = await service.getAll()
      items.value = data
    }

    const create = async (values: InventorySchema): Promise<boolean> => {
      const { data } = await service.create(values)
      if (!data) throw new Error('Error creating inventory item')
      console.log(data)
      items.value = [...items.value, data]

      return true
    }

    const update = async (id: string, values: Partial<InventorySchema>): Promise<boolean> => {
      const { data } = await service.update(id, values)
      if (!data) throw new Error('Error updating inventory item')
      items.value = items.value.map((i) => (i.id === id ? { ...i, ...data } : i))
      return true
    }

    const destroy = async (id: string): Promise<boolean> => {
      const { data } = await service.destroy(id)
      if (!data) throw new Error('Error deleting inventory item')
      items.value = items.value.filter((i) => i.id !== id)
      return true
    }

    return {
      items,
      getAll,
      create,
      update,
      destroy,
    }
  },
  { persist: true },
)
