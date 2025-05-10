<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-white">Welcome Back</h1>
        <p class="mt-2 text-gray-400">Log in to continue</p>
      </div>

      <button
        @click="handleSpotifyLogin"
        class="w-full py-3 px-4 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Icon name="mdi:spotify" class="w-6 h-6" />
        <span>Continue with Spotify</span>
      </button>

      <div class="text-center">
        <p class="text-gray-400">
          Don't have an account?
          <NuxtLink to="/signup" class="text-green-500 hover:text-green-400">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

const handleSpotifyLogin = () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI
  const scope = 'user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read'

  if (!clientId || !redirectUri) {
    console.error('Missing Spotify credentials:', { clientId, redirectUri })
    alert('Spotify credentials are not configured. Please check your .env file.')
    return
  }

  const authUrl = new URL('https://accounts.spotify.com/authorize')
  authUrl.searchParams.append('client_id', clientId)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('redirect_uri', redirectUri)
  authUrl.searchParams.append('scope', scope)
  authUrl.searchParams.append('show_dialog', 'true')

  window.location.href = authUrl.toString()
}
</script> 