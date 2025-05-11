<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Your Library</h2>
      <div class="flex items-center space-x-4">
        <button class="text-gray-400 hover:text-white">
          <Icon name="mdi:playlist-plus" class="w-6 h-6" />
        </button>
        <button class="text-gray-400 hover:text-white">
          <Icon name="mdi:arrow-expand" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-4 border-b border-gray-800">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 text-sm font-medium',
          activeTab === tab.id
            ? 'text-white border-b-2 border-white'
            : 'text-gray-400 hover:text-white'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Playlists -->
    <div v-if="activeTab === 'playlists'" class="space-y-4">
      <!-- Create Playlist Option -->
      <div class="flex items-center space-x-2 mb-4">
        <button @click="showCreate = !showCreate" class="bg-[#1DB954] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#1ed760]">
          + Create Playlist
        </button>
        <input
          v-if="showCreate"
          v-model="newPlaylistName"
          type="text"
          placeholder="Playlist name"
          class="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
          @keyup.enter="createPlaylist"
        />
        <button
          v-if="showCreate"
          @click="createPlaylist"
          class="bg-white text-black px-3 py-2 rounded font-semibold hover:bg-gray-200"
        >
          Add
        </button>
      </div>

      <!-- Song selection after creating a playlist -->
      <div v-if="activeNewPlaylistId !== null" class="space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold">Add songs to your playlist</h3>
          <button @click="cancelAddingSongs" class="text-gray-400 hover:text-white px-3 py-1 rounded-full border border-gray-600">Return</button>
        </div>
        <div v-for="song in songsStore.artist.tracks" :key="song.id" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
          <div class="w-16 h-16 bg-gray-700 rounded"></div>
          <div class="flex-1">
            <h3 class="font-medium">{{ song.name }}</h3>
            <p class="text-sm text-gray-400">{{ songsStore.artist.name }}</p>
          </div>
          <button
            class="bg-[#1DB954] text-white px-3 py-1 rounded-full font-semibold hover:bg-[#1ed760]"
            :disabled="isSongInPlaylist(song.id)"
            @click="addSongToNewPlaylist(song.id)"
          >
            <span v-if="isSongInPlaylist(song.id)">Added</span>
            <span v-else>Add to Playlist</span>
          </button>
        </div>
        <button class="mt-4 px-4 py-2 rounded bg-gray-700 text-white font-semibold" @click="finishAddingSongs">Done</button>
      </div>

      <div v-else>
        <div v-if="playlistsStore.playlists.length === 0" class="text-gray-400 text-center py-8">
          No playlists yet. Create your first playlist!
        </div>
        <div v-else>
          <NuxtLink
            v-for="playlist in playlistsStore.playlists"
            :key="playlist.id"
            :to="`/playlist/${playlist.id}`"
            class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
            style="text-decoration: none; color: inherit;"
          >
            <div class="w-16 h-16 bg-gray-700 rounded"></div>
            <div class="flex-1">
              <h3 class="font-medium">{{ playlist.name }}</h3>
              <p class="text-sm text-gray-400">Playlist • {{ playlist.songIds.length }} songs</p>
            </div>
            <button class="text-gray-400 hover:text-white">
              <Icon name="mdi:play" class="w-6 h-6" />
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Liked Songs -->
    <div v-else-if="activeTab === 'liked'" class="space-y-4">
      <div v-if="likedSongsStore.liked.length === 0" class="text-gray-400 text-center py-8">
        No liked songs yet.
      </div>
      <div v-else>
        <div v-for="songId in likedSongsStore.liked" :key="songId" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <div class="w-16 h-16 bg-gray-700 rounded"></div>
          <div class="flex-1">
            <h3 class="font-medium">Liked Song {{ songId }}</h3>
            <p class="text-sm text-gray-400">Artist Name</p>
          </div>
          <button class="text-gray-400 hover:text-white">
            <Icon name="mdi:play" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlaylistsStore } from '../stores/playlists'
import { useLikedSongsStore } from '../stores/liked'
import { useSongsStore } from '../stores/songs'

const tabs = [
  { id: 'playlists', name: 'Playlists' },
  { id: 'liked', name: 'Liked Songs' }
]

const activeTab = ref('playlists')
const playlistsStore = usePlaylistsStore()
const likedSongsStore = useLikedSongsStore()
const songsStore = useSongsStore()

const showCreate = ref(false)
const newPlaylistName = ref('')
const activeNewPlaylistId = ref<number|null>(null)

function createPlaylist() {
  if (newPlaylistName.value.trim()) {
    playlistsStore.createPlaylist(newPlaylistName.value.trim())
    // Get the new playlist's id (last in array)
    const newId = playlistsStore.playlists[playlistsStore.playlists.length - 1].id
    activeNewPlaylistId.value = newId
    newPlaylistName.value = ''
    showCreate.value = false
  }
}

function addSongToNewPlaylist(songId: number) {
  if (activeNewPlaylistId.value !== null) {
    playlistsStore.addSongToPlaylist(activeNewPlaylistId.value, songId)
  }
}

function isSongInPlaylist(songId: number) {
  if (activeNewPlaylistId.value === null) return false
  const playlist = playlistsStore.playlists.find(p => p.id === activeNewPlaylistId.value)
  return playlist ? playlist.songIds.includes(songId) : false
}

function finishAddingSongs() {
  activeNewPlaylistId.value = null
}

function cancelAddingSongs() {
  activeNewPlaylistId.value = null
}
</script> 