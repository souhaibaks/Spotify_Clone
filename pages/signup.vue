<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-white">Create Account</h1>
        <p class="mt-2 text-gray-400">Sign up to start listening</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-300">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
        >
          Sign Up
        </button>
      </form>

      <div class="text-center">
        <p class="text-gray-400">
          Already have an account?
          <NuxtLink to="/login" class="text-green-500 hover:text-green-400">
            Log in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const { push } = useRouter()

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  try {
    // Here you would typically make an API call to register the user
    // For now, we'll just redirect to login
    push('/login')
  } catch (error) {
    console.error('Error signing up:', error)
  }
}
</script> 