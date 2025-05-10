<template>
  <div class="space-y-8">
    <section>
      <h2 class="mb-4 text-2xl font-bold">Good Evening</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="playlist in featuredPlaylists" :key="playlist.id" class="card group cursor-pointer">
          <img :src="playlist.images[0].url" :alt="playlist.name" class="mb-4 aspect-square w-full rounded-lg object-cover" />
          <h3 class="font-medium">{{ playlist.name }}</h3>
          <p class="text-sm text-gray-400">{{ playlist.description }}</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="mb-4 text-2xl font-bold">Recently Played</h2>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="track in recentTracks" :key="track.id" class="card group cursor-pointer">
          <img :src="track.album.images[0].url" :alt="track.name" class="mb-4 aspect-square w-full rounded-lg object-cover" />
          <h3 class="font-medium">{{ track.name }}</h3>
          <p class="text-sm text-gray-400">{{ track.artists.map(artist => artist.name).join(', ') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSpotifyApi } from '../composables/useSpotifyApi'

const featuredPlaylists = ref([])
const recentTracks = ref([])

const { apiFetch } = useSpotifyApi()

onMounted(async () => {
  try {
    // Fetch featured playlists
    const playlistsData = await apiFetch('/browse/featured-playlists')
    featuredPlaylists.value = playlistsData.playlists.items

    // Fetch recently played tracks
    const tracksData = await apiFetch('/me/player/recently-played')
    recentTracks.value = tracksData.items.map(item => item.track)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script> 