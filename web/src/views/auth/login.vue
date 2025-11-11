<template>
  <Container>
    <UPageCard class="w-full max-w-md mx-auto">
      <UAuthForm :loading :schema="loginSchema" title="Login"
        description="Use your registered email and password to access your account." icon="i-lucide-user"
        :fields="fields" @submit="onSubmit" />
      <UAlert v-if="error" color="error" title="Error" :description="error" icon="i-lucide-triangle-alert" />
      <div class="mt-6 text-center">
        <p class="text-sm">
          No account? <RouterLink to="/register" class="underline hover:text-primary">Register here.</RouterLink>
        </p>
      </div>
    </UPageCard>
  </Container>
</template>
<script lang="ts" setup>
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { loginSchema, type LoginSchema } from '@/types/auth.types'
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const toast = useToast()
const auth = useAuth()
const authStore = useAuthStore()

const fields: AuthFormField[] = [{
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
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]


const error = ref<string | undefined>()
const loading = ref(false)
const router = useRouter()

const onSubmit = async (payload: FormSubmitEvent<LoginSchema>) => {
  try {
    loading.value = true
    const { data } = await auth.login(payload.data)

    if (!(data.accessToken && data.user)) throw new Error('Error logging you in')
    localStorage.setItem('token', data.accessToken)
    authStore.logUser(data.user)
    router.push('/inventory')
    toast.add({
      title: "Successfully logged in"
    })


  } catch (err) {
     console.error(err)
    let _err = 'Error while trying to log you in. Please try again.'
    const status = (err as any)?.response?.status
    if (status === 401) {
      _err = 'Invalid credentials. Please try again.'
    }

    error.value = _err
  } finally {
    loading.value = false
  }
}
</script>
