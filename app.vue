<template>
  <div class="min-h-screen bg-black text-white">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="w-64 bg-black border-r border-gray-800 p-6">
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-white">Spotify Clone</h1>
        </div>
        <nav class="space-y-4">
          <NuxtLink to="/" class="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="mdi:home" class="w-6 h-6" />
            <span>Home</span>
          </NuxtLink>
          <NuxtLink to="/search" class="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="mdi:magnify" class="w-6 h-6" />
            <span>Search</span>
          </NuxtLink>
          <NuxtLink to="/library" class="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="mdi:library" class="w-6 h-6" />
            <span>Your Library</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
        <div class="p-8">
          <NuxtPage />
        </div>
      </div>
    </div>

    <!-- Player -->
    <Player />
  </div>
</template>

<script setup lang="ts">
// Component logic will be added here
</script>

<style>
body {
  @apply bg-black text-white;
}
</style>
