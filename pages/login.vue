<template>
  <div class="flex min-h-screen items-center justify-center bg-black">
    <div class="w-full max-w-md space-y-8 rounded-lg bg-gray-900 p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white">Welcome to Spotify Clone</h2>
        <p class="mt-2 text-gray-400">Sign in to continue</p>
      </div>

      <button
        @click="login"
        class="group relative flex w-full justify-center rounded-md bg-[#1DB954] px-4 py-3 text-sm font-medium text-white hover:bg-[#1ed760] focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon name="heroicons:musical-note" class="h-5 w-5" />
        </span>
        Sign in with Spotify
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback'

const login = () => {
  const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-library-modify playlist-read-private playlist-modify-private'
  
  const authUrl = new URL('https://accounts.spotify.com/authorize')
  authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI)
  authUrl.searchParams.append('scope', scope)
  
  window.location.href = authUrl.toString()
}
</script> 