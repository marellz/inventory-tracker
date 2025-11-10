<template>
  <section class="flex flex-col justify-center items-center text-center px-4 pt-[15vh]">
    <div>
      <h1 class="text-4xl font-bold mb-4">Stay on Top of Your Stock, Effortlessly</h1>
      <p class="text-gray-600 max-w-lg mb-6">
        Track products, monitor quantities, and manage your inventory in real time — all from one simple dashboard.
      </p>
      <div class="space-x-4">
        <template v-if="isAuthenticated">
          <RouterLink to="/inventory">
            <UButton size="xl">
              <span>View my Inventory</span>
            </UButton>
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/register">
            <UButton size="xl">
              <span>Get Started</span>
            </UButton>
          </RouterLink>
          <RouterLink to="/login">
            <UButton variant="outline" size="xl">
              <span>Login</span>
            </UButton>
          </RouterLink>
        </template>
      </div>
      <p class="text-sm text-gray-400 mt-6">
        Built for small teams who want control, not complexity.
      </p>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';

const { isAuthenticated } = useAuthStore()
</script>
