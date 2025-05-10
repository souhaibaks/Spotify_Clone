import { defineStore } from 'pinia'
import { Howl } from 'howler'

interface PlayerState {
  currentTrack: any | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
  howl: Howl | null
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    currentTrack: null,
    isPlaying: false,
    volume: 1,
    progress: 0,
    duration: 0,
    howl: null
  }),

  actions: {
    setCurrentTrack(track: any) {
      this.currentTrack = track
      if (this.howl) {
        this.howl.stop()
      }
      this.howl = new Howl({
        src: [track.preview_url],
        html5: true,
        onplay: () => {
          this.isPlaying = true
          this.duration = this.howl?.duration() || 0
          this.updateProgress()
        },
        onpause: () => {
          this.isPlaying = false
        },
        onstop: () => {
          this.isPlaying = false
          this.progress = 0
        },
        onend: () => {
          this.isPlaying = false
          this.progress = 0
        }
      })
      this.play()
    },

    play() {
      if (this.howl) {
        this.howl.play()
      }
    },

    pause() {
      if (this.howl) {
        this.howl.pause()
      }
    },

    setVolume(volume: number) {
      this.volume = volume
      if (this.howl) {
        this.howl.volume(volume)
      }
    },

    seek(position: number) {
      if (this.howl) {
        this.howl.seek(position)
        this.progress = position
      }
    },

    updateProgress() {
      if (this.howl && this.isPlaying) {
        this.progress = this.howl.seek() as number
        requestAnimationFrame(() => this.updateProgress())
      }
    }
  }
}) 