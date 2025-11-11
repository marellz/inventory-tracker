<template>
  <Container>
    <UPageHeader headline="Hello Dave!" title="Inventory" description="Track and update your inventory items." />

    <UPageBody>
      <template v-if="items.length > 0">
        <div class="space-y-6">
          <div class="flex justify-between">
            <p>Showing {{ items.length }} inventory items.</p>

            <UButton @click="modal.open()">
              <UIcon name="i-lucide-plus" />
              <span>Create new item</span>
            </UButton>

          </div>
          <div>
            <UTable :columns :data="items" class="flex-1" />
          </div>
        </div>
      </template>
      <template v-else>
        <UEmpty icon="i-lucide-list-x" title="Empty inventory..."
          description="It looks like you haven't added any items to your inventory. Create one to get started."
          :actions="[
            {
              icon: 'i-lucide-plus',
              label: 'Create new',
              onClick: () => {
                modal.open()
              }
            },
          ]" />
      </template>
    </UPageBody>

  </Container>
</template>
<script lang="ts" setup>
import InventoryForm from '@/components/feat/inventory/InventoryForm.vue';
import Container from '@/components/wrapper/Container.vue';
import { useInventoryStore } from '@/stores/inventory';
import type { InventoryItem } from '@/types/inventory.types';
import type { TableColumn } from '@nuxt/ui';
import { computed, h, onMounted, ref, resolveComponent } from 'vue';
import type { Row } from '@tanstack/vue-table'

const store = useInventoryStore()

const items = computed(() => store.items)
const toast = useToast()

const overlay = useOverlay()
const modal = overlay.create(InventoryForm)

// table components
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const fetch = async () => {
  try {
    await store.getAll()
  } catch (error) {
    toast.add({
      title: "Error getting Inventory items",
      color: "error"
    })
  }
}

onMounted(() => {
  fetch()
})

const editItem = (item: InventoryItem) => {
  modal.open({
    form: item
  })
}

const deleteItem = async(id: string) => {
  const consent = confirm('Are you certain?')
  if(!consent) return
  await store.destroy(id)
}

const rowActions = (row: Row<InventoryItem>) => {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Edit item",
      onSelect() {
        editItem(row.original)
      }
    },
    {
      label: "Delete item",
      onSelect() {
        deleteItem(row.original.id)
      }
    }
  ]
}

const columns: TableColumn<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "Item name",
    cell: ({ row }) => h('p', { class: "font-medium" }, row.getValue('name'))
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => h('p', {}, [
      h('span', { class: "text-xs text-slate-400" }, 'Ksh.'),
      h('span', { class: "font-medium" }, row.getValue('price'))
    ])
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue('quantity') as number
      if (!quantity) return h('p', { class: "italic" }, 'No pieces')
      return h('p', {}, `${quantity} ${quantity === 1 ? ' piece' : ' pieces'}`)
    }
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const quantity = row.getValue('quantity') as number
      if (quantity >= 5) return h(UBadge, 'In stock')
      if (quantity > 0) return h(UBadge, { color: "warning" }, 'Low stock')
      return h(UBadge, { color: "error" }, 'Out of stock')
    }
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: rowActions(row),
            'aria-label': 'Inventory actions'
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-more-horizontal',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Iventory actions'
            })
        )
      )
    }
  }
]


</script>
