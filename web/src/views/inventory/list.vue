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
            <UTable :data="items" class="flex-1" />
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
import { onMounted } from 'vue';

const { items, getAll } = useInventoryStore()
const toast = useToast()

const overlay = useOverlay()
const modal = overlay.create(InventoryForm)

const fetch = async () => {
  try {
    await getAll()
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

</script>
