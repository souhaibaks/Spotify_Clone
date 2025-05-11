<template>
  <div class="min-h-screen bg-[#191414] text-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2">Welcome Back</h1>
        <p class="text-[#B3B3B3]">Log in to continue to Music App</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-[#282828] border border-[#404040] rounded-lg focus:outline-none focus:border-[#1DB954]"
            placeholder="Enter your email"
          >
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-2">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="w-full px-4 py-3 bg-[#282828] border border-[#404040] rounded-lg focus:outline-none focus:border-[#1DB954]"
            placeholder="Enter your password"
          >
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760] transition-colors"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>

        <p class="text-center text-[#B3B3B3]">
          Don't have an account?
          <NuxtLink to="/signup" class="text-[#1DB954] hover:underline">
            Sign up
          </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

interface FormData {
  email: string
  password: string
}

const formData = ref<FormData>({
  email: '',
  password: ''
})

const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    error.value = ''
    isLoading.value = true
    await authStore.login(formData.value.email, formData.value.password)
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred during login'
  } finally {
    isLoading.value = false
  }
}
</script> 