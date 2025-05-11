<template>
  <div class="space-y-6" :key="$route.fullPath">
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="What do you want to listen to?"
        class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <Icon
        name="mdi:magnify"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
      />
    </div>

    <div v-if="searchQuery" class="space-y-8">
      <!-- Artists (real data) -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Artists</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <NuxtLink :to="`/artist/${encodeURIComponent(artist.name)}`" class="bg-gray-800 p-4 rounded-lg flex flex-col items-center hover:bg-gray-700 transition-colors cursor-pointer" style="text-decoration: none; color: inherit;">
            <div class="aspect-square bg-gray-700 rounded-full mb-4 w-24 h-24 flex items-center justify-center overflow-hidden">
              <img :src="artist.albumCover" :alt="artist.name" class="object-cover w-full h-full" />
            </div>
            <h3 class="font-medium">{{ artist.name }}</h3>
            <p class="text-sm text-gray-400">Artist</p>
          </NuxtLink>
        </div>
      </section>

      <!-- Songs (real data) -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Songs</h2>
        <div class="space-y-2">
          <NuxtLink v-for="song in filteredSongs" :key="song.id" :to="`/song/${song.id}`" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer" style="text-decoration: none; color: inherit;">
            <div class="w-12 h-12 bg-gray-700 rounded overflow-hidden">
              <img :src="artist.albumCover" :alt="song.name" class="object-cover w-full h-full" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium">{{ song.name }}</h3>
              <NuxtLink :to="`/artist/${encodeURIComponent(artist.name)}`" class="text-sm text-[#1DB954] hover:underline" style="text-decoration: none;">{{ artist.name }}</NuxtLink>
            </div>
            <button class="text-gray-400 hover:text-white">
              <Icon name="mdi:play" class="w-6 h-6" />
            </button>
          </NuxtLink>
        </div>
      </section>

      <!-- Playlists (real data) -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Playlists</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <NuxtLink v-for="playlist in playlistsStore.playlists" :key="playlist.id" :to="`/playlist/${playlist.id}`" class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer flex flex-col items-center" style="text-decoration: none; color: inherit;">
            <div class="aspect-square bg-gray-700 rounded-md mb-4 w-24 h-24"></div>
            <h3 class="font-medium">{{ playlist.name }}</h3>
            <p class="text-sm text-gray-400">Playlist • {{ playlist.songIds.length }} songs</p>
          </NuxtLink>
        </div>
      </section>
    </div>

    <div v-else class="space-y-8">
      <h2 class="text-2xl font-bold">Browse All</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="category in categories" :key="category" class="aspect-square bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer p-4 flex flex-col items-center justify-center" @click="selectCategory(category)">
          <img src="/images/image.png" alt="Category" class="w-full h-full object-cover rounded mb-2" />
          <h3 class="text-xl font-bold">{{ category }}</h3>
        </div>
      </div>
      <div v-if="selectedCategory" class="mt-8">
        <h2 class="text-2xl font-bold mb-4">{{ selectedCategory }} Songs</h2>
        <div class="space-y-2">
          <NuxtLink v-for="song in songsByCategory" :key="song.id" :to="`/song/${song.id}`" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer" style="text-decoration: none; color: inherit;">
            <div class="w-12 h-12 bg-gray-700 rounded overflow-hidden">
              <img :src="artist.albumCover" :alt="song.name" class="object-cover w-full h-full" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium">{{ song.name }}</h3>
              <NuxtLink :to="`/artist/${encodeURIComponent(artist.name)}`" class="text-sm text-[#1DB954] hover:underline" style="text-decoration: none;">{{ artist.name }}</NuxtLink>
            </div>
            <button class="text-gray-400 hover:text-white">
              <Icon name="mdi:play" class="w-6 h-6" />
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSongsStore } from '../stores/songs'
import { usePlaylistsStore } from '../stores/playlists'

const searchQuery = ref('')
const selectedCategory = ref('')
const songsStore = useSongsStore()
const playlistsStore = usePlaylistsStore()
const artist = computed(() => songsStore.artist)

const categories = computed(() => {
  const cats = songsStore.artist.tracks.map(song => song.category)
  return [...new Set(cats)]
})

const songsByCategory = computed(() => {
  if (!selectedCategory.value) return []
  return songsStore.artist.tracks.filter(song => song.category === selectedCategory.value)
})

const filteredSongs = computed(() => {
  if (!searchQuery.value) return []
  return songsStore.artist.tracks.filter(song =>
    song.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    artist.value.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function selectCategory(category: string) {
  selectedCategory.value = category
}
</script> 