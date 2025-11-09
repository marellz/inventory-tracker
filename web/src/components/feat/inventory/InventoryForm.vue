<template>
  <UModal v-model:open="show" title="Inventory form" description="Create or update your inventory items"
    :close="{ onClick: () => emit('close', false) }">
    <template #body>
      <div>
        <UForm :schema="inventorySchema" :state="state" @submit="onSubmit">

          <div class="grid md:grid-cols-2 gap-4">

            <UFormField label="Name" name="title">
              <UInput v-model="state.title" class="w-full" />
            </UFormField>

            <UFormField label="Category" name="category">
              <USelect v-model="state.category" :default-value="undefined" :items="categories" class="w-full" />
            </UFormField>

            <UFormField label="Description" name="description" class="md:col-span-2">
              <UTextarea v-model="state.description" class="w-full"></UTextarea>
            </UFormField>


            <UFormField label="Price" name="price">
              <UInput type="number" v-model="state.price" class="w-full" />
            </UFormField>

            <UFormField label="Quantity" name="quantity">
              <UInput type="number" v-model="state.quantity" class="w-full" />
            </UFormField>

            <div class="md:col-span-2 flex items-center justify-end gap-4">
              <UButton type="button" variant="outline" @click="handleCancel">
                Cancel
              </UButton>
              <UButton type="submit">
                Submit
              </UButton>

            </div>

          </div>
        </UForm>

      </div>
    </template>
  </UModal>
</template>
<script lang="ts" setup>
import { inventorySchema, type InventorySchema } from '@/types/inventory.types';
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive, ref, } from 'vue';

const props = defineProps<{
  open?: boolean
}>()

const emit = defineEmits<{ close: [boolean] }>()

const show = ref(props.open)

const categories = [
  'Tools',
  'Lighting',
  'Painting',
  'Outdoor',
  'Electrical',
  'Safety',
  'Plumbing',
  'Building',
]

const state = reactive<Partial<InventorySchema>>({
  'category': "Tools"
})

const onSubmit = (payload: FormSubmitEvent<InventorySchema>) => {
  console.log('new inventory item!', payload)

  // emit('submit', payload)
}

const handleCancel = () => {
  state.category = "Tools"
  state.title = undefined
  state.category = undefined
  state.price = undefined
  state.quantity = undefined

  emit('close', false)
}


</script>
