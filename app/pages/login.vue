<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email" class="sr-only">Email address</label>
                        <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" v-model="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Password" />
                    </div>
                </div>

                <div v-if="errorMessage" class="text-red-600 text-sm text-center">
                    {{ errorMessage }}
                </div>

                <div>
                    <button type="submit" :disabled="isLoading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </span>
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </div>

                <!-- Demo Credentials -->
                <div class="mt-6 p-4 bg-blue-50 rounded-md">
                    <h3 class="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
                    <div class="text-xs text-blue-700 space-y-1">
                        <p><strong>Admin:</strong> john@example.com / admin123</p>
                        <p><strong>User:</strong> jane@example.com / user123</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})

const { login } = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
    if (!email.value || !password.value) return

    isLoading.value = true
    errorMessage.value = ''

    try {
        const success = await login(email.value, password.value)

        if (success) {
            await navigateTo('/')
        } else {
            errorMessage.value = 'Invalid email or password'
        }
    } catch (error) {
        errorMessage.value = 'An error occurred during login'
    } finally {
        isLoading.value = false
    }
}

// SEO
useHead({
    title: 'Login - Dashboard'
})
</script>
