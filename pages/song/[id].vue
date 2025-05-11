<template>
  <div class="min-h-screen bg-[#121212] text-white flex flex-col items-center py-12">
    <div class="w-full max-w-xl mb-4 flex justify-start">
      <button @click="goBack" class="text-gray-400 hover:text-white px-4 py-2 rounded-full border border-gray-600">Return</button>
    </div>
    <div class="bg-[#181818] rounded-lg p-8 flex flex-col items-center w-full max-w-xl">
      <img :src="artist.albumCover" :alt="artist.name" class="w-48 h-48 rounded mb-6" />
      <h1 class="text-3xl font-bold mb-2">{{ song.name }}</h1>
      <NuxtLink :to="`/artist/${encodeURIComponent(artist.name)}`" class="text-[#1DB954] text-lg mb-1 hover:underline" style="text-decoration: none;">by {{ artist.name }}</NuxtLink>
      <p class="text-[#1DB954] text-base mb-4">Category: {{ song.category }}</p>
      <audio :src="song.path" controls class="w-full mb-6"></audio>
      <button
        @click="toggleLike"
        class="px-6 py-2 rounded-full text-white font-semibold mb-6"
        :class="liked ? 'bg-[#1DB954]' : 'bg-[#404040]'"
      >
        {{ liked ? 'Liked' : 'Add to Liked Songs' }}
      </button>
      <div v-if="playlistsStore.playlists.length > 0" class="w-full flex flex-col items-center mb-2">
        <div class="w-full flex flex-col items-center border-t border-[#333] pt-6">
          <label for="playlist-select" class="mb-2 text-sm text-gray-400 font-semibold tracking-wide">Add to Playlist</label>
          <div class="relative w-full max-w-xs mb-3">
            <select id="playlist-select" v-model="selectedPlaylistId" class="w-full px-4 py-2 pr-10 rounded-full bg-[#232323] text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954] appearance-none">
              <option disabled value="">Select a playlist</option>
              <option v-for="playlist in playlistsStore.playlists" :key="playlist.id" :value="playlist.id">
                {{ playlist.name }}
              </option>
            </select>
            <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button
            :disabled="!selectedPlaylistId || isSongInPlaylist"
            @click="addToPlaylist"
            class="flex items-center gap-2 bg-[#1DB954] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#1ed760] disabled:opacity-50 transition-colors"
          >
            <svg v-if="!isSongInPlaylist" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span v-if="isSongInPlaylist">Added!</span>
            <span v-else>Add to Playlist</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useSongsStore } from '../../stores/songs'
import { useLikedSongsStore } from '../../stores/liked'
import { usePlaylistsStore } from '../../stores/playlists'

const route = useRoute()
const router = useRouter()
const songsStore = useSongsStore()
const likedSongsStore = useLikedSongsStore()
const playlistsStore = usePlaylistsStore()
const songId = Number(route.params.id)
const song = computed(() => songsStore.artist.tracks.find(t => t.id === songId) || songsStore.artist.tracks[0])
const artist = computed(() => songsStore.artist)

const liked = computed(() => likedSongsStore.isLiked(songId))
const toggleLike = () => {
  if (liked.value) {
    likedSongsStore.unlikeSong(songId)
  } else {
    likedSongsStore.likeSong(songId)
  }
}

const selectedPlaylistId = ref('')
const isSongInPlaylist = computed(() => {
  if (!selectedPlaylistId.value) return false
  const playlist = playlistsStore.playlists.find(p => p.id === Number(selectedPlaylistId.value))
  return playlist ? playlist.songIds.includes(songId) : false
})

function addToPlaylist() {
  if (!selectedPlaylistId.value) return
  playlistsStore.addSongToPlaylist(Number(selectedPlaylistId.value), songId)
}

function goBack() {
  router.back()
}
</script>

<style scoped>
.bg-liked {
  background: #1DB954;
}
select {
  background-image: none;
}
</style> 