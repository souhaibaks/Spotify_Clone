<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div class="text-center">
      <p class="text-white text-xl">Connecting to Spotify...</p>
      <div class="mt-4">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500 mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const code = route.query.code as string
  if (!code) {
    console.error('No code received from Spotify')
    router.push('/login')
    return
  }

  try {
    console.log('Received code from Spotify, exchanging for tokens...')
    await authStore.handleCallback(code)
    console.log('Successfully authenticated with Spotify')
    router.push('/')
  } catch (error) {
    console.error('Error handling callback:', error)
    router.push('/login')
  }
})
</script> 