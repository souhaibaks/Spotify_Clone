<template>
  <div class="min-h-screen bg-[#191414] text-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2">Create Account</h1>
        <p class="text-[#B3B3B3]">Sign up to start listening to music</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium mb-2">Username</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            required
            minlength="2"
            class="w-full px-4 py-3 bg-[#282828] border border-[#404040] rounded-lg focus:outline-none focus:border-[#1DB954]"
            placeholder="Choose a username"
          >
        </div>

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
            minlength="6"
            class="w-full px-4 py-3 bg-[#282828] border border-[#404040] rounded-lg focus:outline-none focus:border-[#1DB954]"
            placeholder="Create a password"
          >
          <p class="mt-1 text-sm text-[#B3B3B3]">Password must be at least 6 characters long</p>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            required
            class="w-full px-4 py-3 bg-[#282828] border border-[#404040] rounded-lg focus:outline-none focus:border-[#1DB954]"
            placeholder="Confirm your password"
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
          {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
        </button>

        <p class="text-center text-[#B3B3B3]">
          Already have an account?
          <NuxtLink to="/login" class="text-[#1DB954] hover:underline">
            Log in
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
  confirmPassword: string
  username: string
}

const formData = ref<FormData>({
  email: '',
  password: '',
  confirmPassword: '',
  username: ''
})

const error = ref('')
const isLoading = ref(false)

const handleSignup = async () => {
  try {
    error.value = ''
    isLoading.value = true

    // Validate passwords match
    if (formData.value.password !== formData.value.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Validate password length
    if (formData.value.password.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }

    // Validate username
    if (!formData.value.username || formData.value.username.length < 2) {
      throw new Error('Username must be at least 2 characters long')
    }

    await authStore.signup(formData.value.email, formData.value.password, formData.value.username)
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred during signup'
  } finally {
    isLoading.value = false
  }
}
</script> 