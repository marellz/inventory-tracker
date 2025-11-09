import z from 'zod'

export interface InventoryItem {
  id: string
  name: string
  category: string
  description: string | null
  quantity: number
  price: number
}

export interface InventoryCategory {
  name: string
  description: string
}

export const inventorySchema = z.object({
  title: z.string('Item name is required'),
  category: z.string('Category is required'),
  description: z.string().optional().nullable(),
  quantity: z.coerce.number<number>('Quantity is required').min(0, 'Quantity is required'),
  price: z.coerce.number<number>('Price is required').min(0.1, 'Quantity is required'),
})

export type InventorySchema = z.infer<typeof inventorySchema>
