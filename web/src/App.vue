<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Container from './components/wrapper/Container.vue';
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
const store = useAuthStore()

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
  { path: "/inventory", label: "View my inventory", variant: "solid" },
]

const isAuthenticated = computed(() => store.isAuthenticated)
const displayLinks = computed(() => isAuthenticated.value ? authLinks : unAuthLinks)

const router = useRouter()
const logout = () => {
  store.logUser(undefined)
  localStorage.removeItem('token')
  router.push('/')
}

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
            <li v-if="isAuthenticated">
              <UButton variant="ghost" @click="logout">
                <UIcon name="i-lucide-log-out" />
                <span>Logout</span>
              </UButton>
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
