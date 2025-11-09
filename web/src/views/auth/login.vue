<template>
  <Container>
    <UPageCard class="w-full max-w-md mx-auto">
      <UAuthForm :schema="loginSchema" title="Login"
        description="Use your registered email and password to access your account." icon="i-lucide-user"
        :fields="fields" @submit="onSubmit" />
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

const toast = useToast()

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


function onSubmit(payload: FormSubmitEvent<LoginSchema>) {
  console.log(payload)
}
</script>
