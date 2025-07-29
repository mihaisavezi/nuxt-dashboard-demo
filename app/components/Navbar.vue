<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl font-bold">
            Dashboard
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              :class="{ 'bg-blue-700': $route.path === '/' }"
            >
              Home
            </NuxtLink>
            <NuxtLink
              v-if="isAdmin"
              to="/users"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              :class="{ 'bg-blue-700': $route.path === '/users' }"
            >
              Users
            </NuxtLink>
          </div>
        </div>

        <!-- User Info & Logout -->
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <span class="text-sm mr-4">
              Welcome, {{ user?.name }}
            </span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                v-show="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-show="isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isMobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
        <NuxtLink
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
          @click="closeMobileMenu"
        >
          Home
        </NuxtLink>
        <NuxtLink
          v-if="isAdmin"
          to="/users"
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
          @click="closeMobileMenu"
        >
          Users
        </NuxtLink>
        <div class="border-t border-blue-600 pt-2">
          <div class="px-3 py-2 text-sm text-gray-200">
            Welcome, {{ user?.name }}
          </div>
          <button
            @click="handleLogout"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 mt-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { user, logout, isAdmin } = useAuthStore()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  closeMobileMenu()
  logout()
}

// Close mobile menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const nav = document.querySelector('nav')
    if (nav && !nav.contains(event.target as Node)) {
      isMobileMenuOpen.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
