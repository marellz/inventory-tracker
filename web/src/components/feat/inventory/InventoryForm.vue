<template>
  <UModal v-model:open="show" title="Inventory form" description="Create or update your inventory items"
    :close="{ onClick: () => emit('close', false) }">
    <template #body>
      <div>
        <UForm :schema="inventorySchema" :state="state" @submit="onSubmit">

          <div class="grid md:grid-cols-2 gap-4">

            <UFormField label="Name" name="name">
              <UInput v-model="state.name" class="w-full" />
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
              <UButton type="button" variant="outline" @click="handleClose">
                Cancel
              </UButton>
              <UButton type="submit">
                {{ isEdit ? 'Update' : "Create" }}
              </UButton>
            </div>

            <div class="md-col-span-2">
              <UAlert v-if="error" color="error" title="Error" :description="error" icon="i-lucide-triangle-alert" />
            </div>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
<script lang="ts" setup>
import { useInventoryStore } from '@/stores/inventory';
import { inventorySchema, type InventoryItem, type InventorySchema } from '@/types/inventory.types';
import type { FormSubmitEvent } from '@nuxt/ui';
import { computed, onMounted, reactive, ref, } from 'vue';

const props = defineProps<{
  open?: boolean,
  form?: InventoryItem
}>()

const emit = defineEmits<{
  close: [bool: boolean]
}>()

const show = ref(props.open)
const loading = ref(false)
const error = ref<string | undefined>()
const isEdit = computed(() => props.form !== undefined)
const toast = useToast()

const { create, update } = useInventoryStore()

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

const onSubmit = async (payload: FormSubmitEvent<InventorySchema>) => {
  try {
    loading.value = true
    error.value = undefined
    let success = false
    let toastMessage = 'Successfully created the inventory item.'
    if (props.form) {
      success = await update(props.form.id, payload.data)
      toastMessage = 'Successfully updated the inventory item.'
    } else {
      success = await create(payload.data)
    }

    if (!success) throw new Error('An unknown error occurred on submission. Please try again.')
    toast.add({ title: toastMessage })
    handleClose()
  
  } catch (err) {
    console.error(err)
    let _err = 'Error submitting your inventory item'
    const errMessage = (err as any).response.data.message
    if (errMessage) {
      _err = errMessage
    }
    toast.add({ title: 'A problem occurred while trying to submit your inventory item', color: 'error' })
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  show.value = false
  emit('close', false)

  state.category = "Tools"
  state.name = undefined
  state.category = undefined
  state.price = undefined
  state.quantity = undefined
  
}

onMounted(() => {
  if (!props.form) return

  state.name = props.form.name
  state.category = props.form.category
  state.price = props.form.price
  state.quantity = props.form.quantity
  state.description = props.form.description
})


</script>
