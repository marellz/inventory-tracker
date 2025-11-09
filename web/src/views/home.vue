<template>
  <section class="min-h-[50vw] flex flex-col justify-center items-center text-centerpx-4">
    <div>
      <h1 class="text-4xl font-bold mb-4">Stay on Top of Your Stock, Effortlessly</h1>
      <p class="text-gray-600 max-w-lg mb-6">
        Track products, monitor quantities, and manage your inventory in real time — all from one simple dashboard.
      </p>
      <div class="space-x-4">
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
      </div>
      <p class="text-sm text-gray-400 mt-6">
        Built for small teams who want control, not complexity.
      </p>
    </div>
  </section>
</template>
