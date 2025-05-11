<template>
  <div class="min-h-screen bg-[#121212] text-white flex flex-col items-center py-12">
    <div class="w-full max-w-xl mb-4 flex justify-start">
      <NuxtLink to="/search" class="text-gray-400 hover:text-white px-4 py-2 rounded-full border border-gray-600">Return</NuxtLink>
    </div>
    <div class="bg-[#181818] rounded-lg p-8 flex flex-col items-center w-full max-w-xl">
      <h1 class="text-3xl font-bold mb-6">{{ artist.name }}</h1>
      <img :src="artist.albumCover" :alt="artist.name" class="w-40 h-40 rounded mb-6" />
      <h2 class="text-2xl font-semibold mb-4">Songs</h2>
      <ul class="w-full space-y-4">
        <li v-for="song in artist.tracks" :key="song.id" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
          <NuxtLink :to="`/song/${song.id}`" class="flex-1 flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-700 rounded overflow-hidden">
              <img :src="artist.albumCover" :alt="song.name" class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="font-medium">{{ song.name }}</h3>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSongsStore } from '../../stores/songs'
import { computed } from 'vue'

const route = useRoute()
const songsStore = useSongsStore()
const artist = computed(() => songsStore.artist)
</script> 