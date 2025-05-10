<template>
  <div class="space-y-8">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="What do you want to listen to?"
        class="w-full rounded-full bg-white/10 px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        @input="handleSearch"
      />
      <Icon
        name="heroicons:magnifying-glass"
        class="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
      />
    </div>

    <div v-if="searchResults.length > 0" class="space-y-8">
      <!-- Tracks -->
      <section v-if="searchResults.tracks?.items.length">
        <h2 class="mb-4 text-2xl font-bold">Songs</h2>
        <div class="space-y-2">
          <div
            v-for="track in searchResults.tracks.items"
            :key="track.id"
            class="flex items-center space-x-4 rounded-md p-2 hover:bg-white/10"
            @click="playTrack(track)"
          >
            <img :src="track.album.images[0].url" :alt="track.name" class="h-12 w-12 rounded" />
            <div class="flex-1">
              <h3 class="font-medium">{{ track.name }}</h3>
              <p class="text-sm text-gray-400">
                {{ track.artists.map(artist => artist.name).join(', ') }}
              </p>
            </div>
            <button class="text-gray-400 hover:text-white">
              <Icon name="heroicons:play" class="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      <!-- Artists -->
      <section v-if="searchResults.artists?.items.length">
        <h2 class="mb-4 text-2xl font-bold">Artists</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="artist in searchResults.artists.items"
            :key="artist.id"
            class="card group cursor-pointer text-center"
          >
            <img
              :src="artist.images[0].url"
              :alt="artist.name"
              class="mb-4 aspect-square w-full rounded-full object-cover"
            />
            <h3 class="font-medium">{{ artist.name }}</h3>
            <p class="text-sm text-gray-400">Artist</p>
          </div>
        </div>
      </section>

      <!-- Playlists -->
      <section v-if="searchResults.playlists?.items.length">
        <h2 class="mb-4 text-2xl font-bold">Playlists</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="playlist in searchResults.playlists.items"
            :key="playlist.id"
            class="card group cursor-pointer"
          >
            <img
              :src="playlist.images[0].url"
              :alt="playlist.name"
              class="mb-4 aspect-square w-full rounded-lg object-cover"
            />
            <h3 class="font-medium">{{ playlist.name }}</h3>
            <p class="text-sm text-gray-400">{{ playlist.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { usePlayerStore } from '../stores/player'

const authStore = useAuthStore()
const playerStore = usePlayerStore()
const searchQuery = ref('')
const searchResults = ref({
  tracks: { items: [] },
  artists: { items: [] },
  playlists: { items: [] }
})

const handleSearch = async () => {
  if (!searchQuery.value || !authStore.isAuthenticated) return

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchQuery.value
      )}&type=track,artist,playlist&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`
        }
      }
    )
    const data = await response.json()
    searchResults.value = data
  } catch (error) {
    console.error('Error searching:', error)
  }
}

const playTrack = (track) => {
  playerStore.setCurrentTrack(track)
}
</script> 