<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Container from './components/wrapper/Container.vue';
import { computed } from 'vue';
interface Link {
  path: string;
  label: string;
  variant?: "ghost" | "solid" | "outline"
}
const unAuthLinks: Link[] = [
  { path: "/login", label: "Login", variant: "outline" },
  { path: "/register", label: "Get started", variant: 'solid' }
]

const authLinks: Link[] = [
  { path: "/inventory", label: "Inventory" },
]

const isAuthenticated = computed(() => false)
const displayLinks = computed(() => isAuthenticated.value ? authLinks : unAuthLinks)

</script>

<template>
  <UApp>
    <header>
      <Container>
        <div class="flex items-center space-x-10 py-10">
          <RouterLink to="/">
            <h1 class="text-2xl font-bold">Inventrak<span class="text-primary">.</span>
            </h1>
          </RouterLink>
          <ul class="flex space-x-4 ml-auto">
            <li v-for="({ path, label, variant = 'ghost' }, index) in displayLinks" :key="index">
              <RouterLink :to="path" class="block">
                <UButton :variant="variant ?? 'ghost'">
                  <span>
                    {{ label }}
                  </span>
                </UButton>

              </RouterLink>
            </li>
          </ul>
        </div>
      </Container>
    </header>
    <main>
      <RouterView />
    </main>
  </UApp>

</template>
