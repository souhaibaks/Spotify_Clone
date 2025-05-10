<template>
  <div class="flex min-h-screen items-center justify-center bg-black">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-white">Connecting to Spotify...</h2>
      <p class="mt-2 text-gray-400">Please wait while we set up your account</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const code = route.query.code as string
  
  if (!code) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })

    const data = await response.json()
    
    if (data.access_token) {
      authStore.setTokens(data.access_token, data.refresh_token)
      
      // Fetch user profile
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      })
      
      const userData = await userResponse.json()
      authStore.setUser(userData)
      
      router.push('/')
    } else {
      router.push('/login')
    }
  } catch (error) {
    console.error('Error during authentication:', error)
    router.push('/login')
  }
})
</script> 