<template>
  <div class="flex items-center justify-between p-4 rounded-lg hover:bg-[#282828] cursor-pointer group">
    <NuxtLink
      :to="`/song/${track.id}`"
      class="flex-1 flex items-center space-x-4"
      style="text-decoration: none; color: inherit;"
    >
      <div class="w-10 h-10 bg-[#404040] rounded overflow-hidden">
        <img 
          :src="artist.albumCover" 
          :alt="track.name"
          class="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 class="font-medium">{{ track.name }}</h3>
        <p class="text-[#B3B3B3] text-sm">{{ artist.name }}</p>
      </div>
    </NuxtLink>
    <div class="flex items-center space-x-4">
      <span class="text-[#B3B3B3] text-sm">{{ formatTime(playerStore.duration) }}</span>
      <button 
        @click.stop="playOrPauseThisSong"
        class="text-[#B3B3B3] hover:text-white group-hover:text-white"
      >
        <svg v-if="!isCurrentTrack || !playerStore.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '../stores/player'

interface Track {
  id: number
  name: string
  path: string
}

interface Artist {
  name: string
  albumCover: string
}

const props = defineProps<{
  track: Track
  artist: Artist
}>()

const playerStore = usePlayerStore()

const isCurrentTrack = computed(() => {
  return playerStore.currentTrack?.id === props.track.id
})

const playOrPauseThisSong = () => {
  playerStore.playOrPauseThisSong(props.artist, props.track)
}

const formatTime = (seconds: number) => {
  if (!seconds) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script> 