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
      <div v-for="i in 10" :key="i" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
        <div class="w-16 h-16 bg-gray-700 rounded"></div>
        <div class="flex-1">
          <h3 class="font-medium">Playlist {{ i }}</h3>
          <p class="text-sm text-gray-400">Playlist • {{ i * 10 }} songs</p>
        </div>
        <button class="text-gray-400 hover:text-white">
          <Icon name="mdi:play" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Liked Songs -->
    <div v-else-if="activeTab === 'liked'" class="space-y-4">
      <div v-for="i in 10" :key="i" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
        <div class="w-16 h-16 bg-gray-700 rounded"></div>
        <div class="flex-1">
          <h3 class="font-medium">Liked Song {{ i }}</h3>
          <p class="text-sm text-gray-400">Artist Name</p>
        </div>
        <button class="text-gray-400 hover:text-white">
          <Icon name="mdi:play" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { id: 'playlists', name: 'Playlists' },
  { id: 'liked', name: 'Liked Songs' }
]

const activeTab = ref('playlists')
</script> 