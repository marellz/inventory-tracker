<template>
  <Container>
    <UPageCard class="w-full max-w-md mx-auto">
      <UAuthForm :schema="registerSchema" title="Register" description="Fill in your details to create an account."
        icon="i-lucide-user" :fields="fields" @submit="onSubmit" />
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

const toast = useToast()

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

function onSubmit(payload: FormSubmitEvent<RegisterSchema>) {
  console.log(payload)
}
</script>
