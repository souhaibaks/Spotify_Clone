<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-white bg-black">
    <h1 class="text-4xl font-bold mb-4">Support</h1>
    <div class="bg-[#181818] p-8 rounded-lg shadow-lg w-full max-w-md">
      <p class="text-lg mb-2">Hello, <span class="font-semibold">{{ authStore.username || 'User' }}</span>!</p>
      <p class="text-lg text-gray-400">Get help and support here. Contact us if you have any issues with your account.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script> 