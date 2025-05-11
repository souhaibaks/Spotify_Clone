<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-white bg-black">
    <h1 class="text-4xl font-bold mb-4">Upgrade to Premium</h1>
    <div class="bg-[#181818] p-8 rounded-lg shadow-lg w-full max-w-md">
      <p class="text-lg mb-2">Hello, <span class="font-semibold">{{ authStore.username || 'User' }}</span>!</p>
      <p class="text-lg text-gray-400">Upgrade your account to enjoy premium features.</p>
      <button class="mt-6 px-6 py-2 rounded-full bg-[#1DB954] text-black font-bold text-lg hover:bg-[#169c46] transition">Upgrade Now</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script> 