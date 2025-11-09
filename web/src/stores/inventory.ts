import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { InventoryItem } from '@/types/inventory.types'

export const useInventoryStore = defineStore(
  'inventory',
  () => {
    const items = ref<InventoryItem[]>([
      {
        id: '1',
        name: 'Cordless Drill',
        category: 'Tools',
        description: '18V lithium-ion drill with two-speed settings',
        quantity: 12,
        price: 79.99,
      },
      {
        id: '2',
        name: 'LED Work Light',
        category: 'Lighting',
        description: 'Rechargeable portable light for workshop use',
        quantity: 25,
        price: 24.5,
      },
      {
        id: '3',
        name: 'Paint Roller Set',
        category: 'Painting',
        description: 'Includes 3 rollers, tray, and brush',
        quantity: 40,
        price: 15.75,
      },
      {
        id: '4',
        name: 'Garden Hose 20m',
        category: 'Outdoor',
        description: 'Durable, kink-resistant hose with metal fittings',
        quantity: 18,
        price: 32.1,
      },
      {
        id: '5',
        name: 'Extension Cord 10m',
        category: 'Electrical',
        description: 'Heavy-duty 3-socket power extension cable',
        quantity: 30,
        price: 19.25,
      },
      {
        id: '6',
        name: 'Adjustable Wrench',
        category: 'Tools',
        description: '10-inch chrome steel wrench with comfort grip',
        quantity: 45,
        price: 11.9,
      },
      {
        id: '7',
        name: 'Safety Goggles',
        category: 'Safety',
        description: 'Anti-fog protective eyewear with ventilation',
        quantity: 60,
        price: 7.4,
      },
      {
        id: '8',
        name: 'PVC Pipe 1-inch',
        category: 'Plumbing',
        description: 'Standard 1-inch diameter PVC pipe, 3m length',
        quantity: 35,
        price: 9.8,
      },
      {
        id: '9',
        name: 'Wall Putty 5kg',
        category: 'Building',
        description: 'Smooth white cement-based wall finishing putty',
        quantity: 22,
        price: 13.6,
      },
      {
        id: '10',
        name: 'Screwdriver Set (6pcs)',
        category: 'Tools',
        description: 'Magnetic-tipped screwdrivers with ergonomic handles',
        quantity: 28,
        price: 17.45,
      },
    ])

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
      add,
      update,
      destroy,
    }
  },
  { persist: true },
)
