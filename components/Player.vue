<template>
  <div v-if="playerStore.currentTrack" class="fixed bottom-0 left-0 right-0 bg-[#282828] p-4 border-t border-[#404040]">
    <div class="max-w-screen-xl mx-auto flex items-center justify-between">
      <!-- Song Info -->
      <div class="flex items-center space-x-4">
        <img 
          :src="playerStore.currentArtist?.albumCover" 
          :alt="playerStore.currentTrack.name"
          class="w-14 h-14 rounded"
        >
        <div>
          <h3 class="font-medium">{{ playerStore.currentTrack.name }}</h3>
          <p class="text-[#B3B3B3] text-sm">{{ playerStore.currentArtist?.name }}</p>
        </div>
      </div>

      <!-- Player Controls -->
      <div class="flex flex-col items-center space-y-2 w-full max-w-2xl">
        <div class="flex items-center space-x-6">
          <button @click="playerStore.prevSong(playerStore.currentTrack)" class="text-[#B3B3B3] hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          
          <button @click="playerStore.playOrPauseSong" class="bg-white rounded-full p-3 hover:scale-105 transition-transform flex items-center justify-center">
            <svg v-if="!playerStore.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button @click="playerStore.nextSong(playerStore.currentTrack)" class="text-[#B3B3B3] hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="flex items-center space-x-2 w-full max-w-2xl">
          <span class="text-xs text-[#B3B3B3]">{{ formatTime(playerStore.progress) }}</span>
          <div class="flex-1 h-2 bg-[#404040] rounded-full cursor-pointer" @click="seek">
            <div 
              class="h-full bg-[#1DB954] rounded-full"
              :style="{ width: `${(playerStore.progress / playerStore.duration) * 100}%` }"
            ></div>
          </div>
          <span class="text-xs text-[#B3B3B3]">{{ formatTime(playerStore.duration) }}</span>
        </div>
      </div>

      <!-- Volume Control -->
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#B3B3B3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
        </svg>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="playerStore.volume"
          @input="playerStore.setVolume(playerStore.volume)"
          class="w-24"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()

const formatTime = (seconds: number) => {
  if (!seconds) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const seek = (event: MouseEvent) => {
  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = x / rect.width
  const newTime = percentage * playerStore.duration
  
  if (playerStore.audio) {
    playerStore.audio.currentTime = newTime
    playerStore.progress = newTime
  }
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  background: #404040;
  height: 4px;
  border-radius: 2px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
</style> 