<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Sidebar Navigation -->
    <nav class="fixed left-0 top-0 h-full w-64 bg-black p-6">
      <div class="mb-8">
        <NuxtLink to="/" class="text-2xl font-bold text-white">Spotify Clone</NuxtLink>
      </div>
      
      <div class="space-y-4">
        <NuxtLink to="/" class="flex items-center space-x-2 text-gray-400 hover:text-white">
          <Icon name="heroicons:home" class="h-6 w-6" />
          <span>Home</span>
        </NuxtLink>
        
        <NuxtLink to="/search" class="flex items-center space-x-2 text-gray-400 hover:text-white">
          <Icon name="heroicons:magnifying-glass" class="h-6 w-6" />
          <span>Search</span>
        </NuxtLink>
        
        <NuxtLink to="/library" class="flex items-center space-x-2 text-gray-400 hover:text-white">
          <Icon name="heroicons:book-open" class="h-6 w-6" />
          <span>Your Library</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="ml-64 p-8">
      <slot />
    </main>

    <!-- Music Player -->
    <div class="fixed bottom-0 left-0 right-0 bg-gray-900 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img :src="currentTrack.albumArt" alt="Album Art" class="h-14 w-14 rounded" />
          <div>
            <h3 class="text-sm font-medium">{{ currentTrack.name }}</h3>
            <p class="text-xs text-gray-400">{{ currentTrack.artist }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-6">
          <button class="text-gray-400 hover:text-white">
            <Icon name="heroicons:backward" class="h-6 w-6" />
          </button>
          <button class="text-white hover:scale-110">
            <Icon name="heroicons:play" class="h-8 w-8" />
          </button>
          <button class="text-gray-400 hover:text-white">
            <Icon name="heroicons:forward" class="h-6 w-6" />
          </button>
        </div>

        <div class="flex items-center space-x-4">
          <button class="text-gray-400 hover:text-white">
            <Icon name="heroicons:speaker-wave" class="h-6 w-6" />
          </button>
          <input type="range" class="w-24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentTrack = ref({
  name: 'No track playing',
  artist: 'Select a track to play',
  albumArt: '/default-album.png'
})
</script> 