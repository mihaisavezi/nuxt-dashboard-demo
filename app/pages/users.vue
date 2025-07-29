<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="bg-white shadow rounded-lg p-6">
            <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
            <p class="mt-2 text-gray-600">Manage and view all users in the system</p>
        </div>

        <!-- Users Table -->
        <UserTable />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth', 'admin']
})

// SEO
useHead({
    title: 'Users - Dashboard'
})
</script>
