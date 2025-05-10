import { defineStore } from 'pinia'
import { useSpotify } from '~/composables/useSpotify'

interface PlayerState {
  currentTrack: any | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    currentTrack: null,
    isPlaying: false,
    volume: 50,
    progress: 0,
    duration: 0,
  }),

  actions: {
    async play(trackUri?: string) {
      const spotify = useSpotify()
      try {
        if (trackUri) {
          await spotify.startPlayback(undefined, [trackUri])
        } else {
          await spotify.startPlayback()
        }
        this.isPlaying = true
        await this.updatePlaybackState()
      } catch (error) {
        console.error('Error playing track:', error)
      }
    },

    async pause() {
      const spotify = useSpotify()
      try {
        await spotify.pausePlayback()
        this.isPlaying = false
      } catch (error) {
        console.error('Error pausing track:', error)
      }
    },

    async next() {
      const spotify = useSpotify()
      try {
        await spotify.skipToNext()
        await this.updatePlaybackState()
      } catch (error) {
        console.error('Error skipping to next track:', error)
      }
    },

    async previous() {
      const spotify = useSpotify()
      try {
        await spotify.skipToPrevious()
        await this.updatePlaybackState()
      } catch (error) {
        console.error('Error skipping to previous track:', error)
      }
    },

    async setVolume(volume: number) {
      const spotify = useSpotify()
      try {
        await spotify.setVolume(volume)
        this.volume = volume
      } catch (error) {
        console.error('Error setting volume:', error)
      }
    },

    async updatePlaybackState() {
      const spotify = useSpotify()
      try {
        const playback = await spotify.getCurrentPlayback()
        if (playback) {
          this.currentTrack = playback.item
          this.isPlaying = playback.is_playing
          this.progress = playback.progress_ms
          this.duration = playback.item?.duration_ms || 0
        }
      } catch (error) {
        console.error('Error updating playback state:', error)
      }
    },

    startProgressUpdate() {
      if (this.isPlaying) {
        this.progress += 1000
        if (this.progress >= this.duration) {
          this.updatePlaybackState()
        }
      }
    },
  },
}) 