<template>
  <div class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
    <div class="flex items-center justify-between">
      <!-- Track Info -->
      <div class="flex items-center space-x-4">
        <div v-if="currentTrack" class="w-14 h-14 bg-gray-800 rounded overflow-hidden">
          <img
            :src="currentTrack.album.images[0]?.url"
            :alt="currentTrack.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-if="currentTrack">
          <h3 class="text-sm font-medium">{{ currentTrack.name }}</h3>
          <p class="text-xs text-gray-400">{{ currentTrack.artists.map((a: any) => a.name).join(', ') }}</p>
        </div>
      </div>

      <!-- Playback Controls -->
      <div class="flex flex-col items-center space-y-2">
        <div class="flex items-center space-x-4">
          <button @click="previous" class="text-gray-400 hover:text-white">
            <Icon name="mdi:skip-previous" class="w-6 h-6" />
          </button>
          <button
            @click="togglePlay"
            class="text-white bg-white rounded-full p-2 hover:scale-105"
          >
            <Icon
              :name="isPlaying ? 'mdi:pause' : 'mdi:play'"
              class="w-6 h-6"
            />
          </button>
          <button @click="next" class="text-gray-400 hover:text-white">
            <Icon name="mdi:skip-next" class="w-6 h-6" />
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="flex items-center space-x-2 w-full max-w-md">
          <span class="text-xs text-gray-400">{{ formatTime(progress) }}</span>
          <div class="flex-1 h-1 bg-gray-700 rounded-full">
            <div
              class="h-full bg-white rounded-full"
              :style="{ width: `${(progress / duration) * 100}%` }"
            ></div>
          </div>
          <span class="text-xs text-gray-400">{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- Volume Control -->
      <div class="flex items-center space-x-4">
        <button @click="toggleMute" class="text-gray-400 hover:text-white">
          <Icon
            :name="volume === 0 ? 'mdi:volume-off' : 'mdi:volume-high'"
            class="w-6 h-6"
          />
        </button>
        <input
          type="range"
          v-model="volume"
          min="0"
          max="100"
          class="w-24"
          @input="setVolume"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '~/stores/player'

const playerStore = usePlayerStore()
const {
  currentTrack,
  isPlaying,
  volume,
  progress,
  duration,
} = storeToRefs(playerStore)

const previousVolume = ref(volume.value)

const togglePlay = () => {
  if (isPlaying.value) {
    playerStore.pause()
  } else {
    playerStore.play()
  }
}

const next = () => {
  playerStore.next()
}

const previous = () => {
  playerStore.previous()
}

const setVolume = (event: Event) => {
  const target = event.target as HTMLInputElement
  playerStore.setVolume(Number(target.value))
}

const toggleMute = () => {
  if (volume.value === 0) {
    playerStore.setVolume(previousVolume.value)
  } else {
    previousVolume.value = volume.value
    playerStore.setVolume(0)
  }
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Update progress every second
onMounted(() => {
  setInterval(() => {
    playerStore.startProgressUpdate()
  }, 1000)
})
</script>

<style scoped>
input[type="range"] {
  @apply appearance-none bg-gray-700 h-1 rounded-full;
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-3 h-3 bg-white rounded-full cursor-pointer;
}

input[type="range"]::-moz-range-thumb {
  @apply appearance-none w-3 h-3 bg-white rounded-full cursor-pointer border-0;
}
</style> 