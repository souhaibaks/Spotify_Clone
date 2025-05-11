<template>
  <div class="min-h-screen bg-[#121212] text-white flex flex-col items-center py-12">
    <div class="bg-[#181818] rounded-lg p-8 flex flex-col items-center w-full max-w-2xl">
      <div class="flex w-full justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold mb-1">{{ playlist?.name }}</h1>
          <p class="text-[#B3B3B3] text-lg">{{ playlist?.songIds.length }} songs</p>
        </div>
        <button @click="deletePlaylist" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold">Delete Playlist</button>
      </div>
      <div v-if="playlist && playlist.songIds.length > 0" class="w-full space-y-4">
        <div v-for="song in playlistSongs" :key="song.id" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
          <NuxtLink :to="`/song/${song.id}`" class="flex-1 flex items-center space-x-4">
            <div class="w-14 h-14 bg-gray-700 rounded overflow-hidden">
              <img :src="artist.albumCover" :alt="song.name" class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="font-medium">{{ song.name }}</h3>
              <p class="text-[#B3B3B3] text-sm">{{ artist.name }}</p>
            </div>
          </NuxtLink>
          <button @click="playSong(song)" class="bg-[#1DB954] text-white px-3 py-1 rounded-full font-semibold hover:bg-[#1ed760]">Play</button>
          <button @click="removeSong(song.id)" class="bg-gray-700 text-white px-3 py-1 rounded-full font-semibold hover:bg-gray-600">Remove</button>
        </div>
      </div>
      <div v-else class="text-gray-400 text-center py-8 w-full">No songs in this playlist yet.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { usePlaylistsStore } from '../../stores/playlists'
import { useSongsStore } from '../../stores/songs'
import { usePlayerStore } from '../../stores/player'

const route = useRoute()
const router = useRouter()
const playlistsStore = usePlaylistsStore()
const songsStore = useSongsStore()
const playerStore = usePlayerStore()

const playlistId = Number(route.params.id)
const playlist = computed(() => playlistsStore.playlists.find(p => p.id === playlistId))
const artist = computed(() => songsStore.artist)
const playlistSongs = computed(() => {
  if (!playlist.value) return []
  return playlist.value.songIds.map(id => songsStore.artist.tracks.find(t => t.id === id)).filter(Boolean)
})

function playSong(song: any) {
  playerStore.loadSong(artist.value, song)
}

function removeSong(songId: number) {
  playlistsStore.removeSongFromPlaylist(playlistId, songId)
}

function deletePlaylist() {
  playlistsStore.removePlaylist(playlistId)
  router.push('/library')
}
</script> 