<template>
  <Container>
    <UPageCard class="w-full max-w-md mx-auto">
      <UAuthForm :loading :schema="registerSchema" title="Register" description="Fill in your details to create an account."
        icon="i-lucide-user" :fields="fields" @submit="onSubmit" />
      <UAlert v-if="error" color="error" title="Error" :description="error" icon="i-lucide-triangle-alert" />
      <div class="mt-6 text-center">
        <p class="text-sm">
          Already have an account? <RouterLink to="/login" class="underline hover:text-primary">Login here.</RouterLink>
        </p>
      </div>
    </UPageCard>
  </Container>
</template>
<script lang="ts" setup>
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { registerSchema, type RegisterSchema } from '@/types/auth.types'
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const toast = useToast()
const auth = useAuth()
const authStore = useAuthStore()

const error = ref<string | undefined>()
const loading = ref(false)

const router = useRouter()

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your name',
    required: true
  }, {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
  }]


const onSubmit = async (payload: FormSubmitEvent<RegisterSchema>) => {
  try {
    loading.value = true
    error.value = undefined
    const { data } = await auth.register(payload.data)

    if (!(data.accessToken && data.user)) throw new Error('Error logging you in')
    localStorage.setItem('token', data.accessToken)
    authStore.logUser(data.user)
    router.push('/inventory')
    toast.add({
      title: "Successfully registered!"
    })

  } catch (err: unknown) {
    console.error(error)
    let _err = 'Error while trying to register your account. Please try again.'
    const messages = (err as any).response?.data?.message
    if (messages.length) {
      _err = messages[0]
    }

    error.value = _err
  } finally {
    loading.value = false
  }

}
</script>
