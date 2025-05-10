<template>
  <div class="min-h-screen bg-black text-white p-8">
    <div v-if="!authStore.isAuthenticated" class="text-center">
      <h1 class="text-4xl font-bold mb-4">Welcome to Music App</h1>
      <p class="text-gray-400 mb-8">Log in to start listening to your favorite music</p>
      <div class="space-x-4">
        <NuxtLink to="/login" class="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors">
          Log In
        </NuxtLink>
        <NuxtLink to="/signup" class="bg-transparent border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
          Sign Up
        </NuxtLink>
      </div>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Recently Played -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Recently Played</h2>
          <div v-if="loading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          </div>
          <div v-else-if="recentlyPlayed.length === 0" class="text-gray-400 text-center py-4">
            No recently played tracks
          </div>
          <div v-else class="space-y-4">
            <div v-for="item in recentlyPlayed" :key="item.track.id" class="flex items-center space-x-4">
              <img :src="item.track.album.images[0]?.url" :alt="item.track.name" class="w-16 h-16 rounded">
              <div>
                <h3 class="font-medium">{{ item.track.name }}</h3>
                <p class="text-gray-400">{{ item.track.artists[0].name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Your Playlists -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Your Playlists</h2>
          <div v-if="loading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          </div>
          <div v-else-if="playlists.length === 0" class="text-gray-400 text-center py-4">
            No playlists found
          </div>
          <div v-else class="space-y-4">
            <div v-for="playlist in playlists" :key="playlist.id" class="flex items-center space-x-4">
              <img :src="playlist.images[0]?.url" :alt="playlist.name" class="w-16 h-16 rounded">
              <div>
                <h3 class="font-medium">{{ playlist.name }}</h3>
                <p class="text-gray-400">{{ playlist.tracks.total }} tracks</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommended -->
        <div class="bg-gray-900 p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-4">Recommended for You</h2>
          <div v-if="loading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          </div>
          <div v-else-if="recommended.length === 0" class="text-gray-400 text-center py-4">
            No recommendations available
          </div>
          <div v-else class="space-y-4">
            <div v-for="track in recommended" :key="track.id" class="flex items-center space-x-4">
              <img :src="track.album.images[0]?.url" :alt="track.name" class="w-16 h-16 rounded">
              <div>
                <h3 class="font-medium">{{ track.name }}</h3>
                <p class="text-gray-400">{{ track.artists[0].name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSpotifyApi } from '../services/spotify'

const authStore = useAuthStore()
const spotifyApi = useSpotifyApi()

const loading = ref(true)
const recentlyPlayed = ref([])
const playlists = ref([])
const recommended = ref([])

const loadData = async () => {
  try {
    loading.value = true
    const [recentlyPlayedData, playlistsData, recommendedData] = await Promise.all([
      spotifyApi.getRecentlyPlayed(),
      spotifyApi.getPlaylists(),
      spotifyApi.getRecommendations()
    ])
    
    recentlyPlayed.value = recentlyPlayedData.items
    playlists.value = playlistsData.items
    recommended.value = recommendedData.tracks
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    loadData()
  }
})

watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    loadData()
  }
})
</script> 