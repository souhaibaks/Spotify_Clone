<template>
  <div class="space-y-6">
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
      <!-- Artists -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Artists</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div class="aspect-square bg-gray-700 rounded-full mb-4"></div>
            <h3 class="font-medium">Artist {{ i }}</h3>
            <p class="text-sm text-gray-400">Artist</p>
          </div>
        </div>
      </section>

      <!-- Songs -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Songs</h2>
        <div class="space-y-2">
          <div v-for="i in 5" :key="i" class="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            <div class="w-12 h-12 bg-gray-700 rounded"></div>
            <div class="flex-1">
              <h3 class="font-medium">Song {{ i }}</h3>
              <p class="text-sm text-gray-400">Artist Name</p>
            </div>
            <button class="text-gray-400 hover:text-white">
              <Icon name="mdi:play" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <!-- Playlists -->
      <section>
        <h2 class="text-2xl font-bold mb-4">Playlists</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div class="aspect-square bg-gray-700 rounded-md mb-4"></div>
            <h3 class="font-medium">Playlist {{ i }}</h3>
            <p class="text-sm text-gray-400">By User</p>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="space-y-8">
      <h2 class="text-2xl font-bold">Browse All</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="i in 12" :key="i" class="aspect-square bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer p-4">
          <h3 class="text-xl font-bold">Category {{ i }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
</script> 