<template>
  <div class="min-h-screen bg-[#121212] text-white">
    <div class="max-w-screen-xl mx-auto px-4 py-8">
      <!-- Filter Bar -->
      <div class="flex space-x-2 mb-8">
        <button class="px-4 py-2 rounded-full bg-[#232323] text-white font-semibold focus:outline-none">All</button>
        <button class="px-4 py-2 rounded-full bg-[#232323] text-gray-300 hover:text-white focus:outline-none">Music</button>
        <button class="px-4 py-2 rounded-full bg-[#232323] text-gray-300 hover:text-white focus:outline-none">Podcasts</button>
      </div>

      <!-- Songs Row (above Made For) -->
      <section class="mb-10">
        <div class="flex space-x-4 overflow-x-auto pb-2">
          <NuxtLink v-for="song in songsStore.recommended" :key="song.id" :to="`/song/${song.id}`" class="min-w-[180px] bg-[#232323] rounded-lg p-3 hover:bg-[#282828] transition-colors flex-shrink-0 flex flex-col items-center cursor-pointer" style="text-decoration: none; color: inherit;">
            <img :src="songsStore.artist.albumCover" alt="cover" class="w-24 h-24 object-cover rounded mb-3" />
            <div class="font-semibold text-base mb-1 text-center w-full truncate">{{ song.name }}</div>
            <div class="text-xs text-gray-400 text-center w-full truncate">{{ songsStore.artist.name }}</div>
          </NuxtLink>
        </div>
      </section>

      <!-- Made For User -->
      <section class="mb-10">
        <h2 class="text-2xl font-bold mb-4">Made for {{ authStore.username || 'User' }}</h2>
        <div class="flex space-x-6 overflow-x-auto pb-2">
          <NuxtLink v-for="playlist in playlistsStore.playlists" :key="playlist.id" :to="`/playlist/${playlist.id}`" class="min-w-[200px] bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-colors flex-shrink-0 cursor-pointer" style="text-decoration: none; color: inherit;">
            <img :src="playlist.cover" alt="cover" class="w-full h-40 object-cover rounded mb-3" />
            <div class="flex items-center mb-2">
              <span class="bg-[#1DB954] text-black text-xs font-bold px-2 py-0.5 rounded mr-2">Daily Mix</span>
              <span class="text-xs text-gray-400 font-bold">{{ playlist.name.slice(-2) }}</span>
            </div>
            <div class="font-semibold text-base mb-1">{{ playlist.name }}</div>
            <div class="text-xs text-gray-400">{{ playlist.description }}</div>
          </NuxtLink>
        </div>
      </section>

      <!-- Jump back in -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Jump back in</h2>
        <div class="flex space-x-6 overflow-x-auto pb-2">
          <NuxtLink v-for="n in 6" :key="n" :to="`/artist/${encodeURIComponent(songsStore.artist.name)}`" class="flex flex-col items-center cursor-pointer" style="text-decoration: none; color: inherit;">
            <div class="w-28 h-28 rounded-full overflow-hidden mb-2 bg-[#232323]">
              <img src="/images/musician.png" alt="Jump back in" class="w-full h-full object-cover" />
            </div>
            <div class="text-sm text-gray-200 font-semibold">{{ songsStore.artist.name }}</div>
          </NuxtLink>
        </div>
      </section>
    </div>

    <!-- Player -->
    <Player />
  </div>
</template>

<script setup lang="ts">
import { useSongsStore } from '../stores/songs'
import SongRow from '../components/SongRow.vue'
import Player from '../components/Player.vue'
import { usePlaylistsStore } from '../stores/playlists'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const songsStore = useSongsStore()
const playlistsStore = usePlaylistsStore()
const authStore = useAuthStore()
// Simulated user (replace with real user store if available)
const user = ref({ name: 'Broke' })
</script> 