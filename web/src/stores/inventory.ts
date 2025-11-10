import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { InventoryItem } from '@/types/inventory.types'
import { useInventory } from '@/composables/useInventory'

export const useInventoryStore = defineStore(
  'inventory',
  () => {
    const service = useInventory()
    const items = ref<InventoryItem[]>([])

    const getAll = async () => {
      const { data } = await service.getAll()
      if (!data) throw new Error('Error getting inventory items')
      items.value = data
    }

    const add = (item: InventoryItem) => {
      items.value = [...items.value, item]
    }

    const update = (item: InventoryItem) => {
      items.value = items.value.map((i) => (i.id === item.id ? { ...i, ...item } : i))
    }

    const destroy = (id: string) => {
      items.value = items.value.filter((i) => i.id !== id)
    }

    return {
      items,
      getAll,
      add,
      update,
      destroy,
    }
  },
  { persist: true },
)
