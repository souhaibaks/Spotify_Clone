import { defineStore } from 'pinia'
import { useSongsStore } from './songs'

interface PlayerState {
  currentTrack: any | null
  currentArtist: any | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
  audio: HTMLAudioElement | null
  error: string | null
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    currentTrack: null,
    currentArtist: null,
    isPlaying: false,
    volume: 50,
    progress: 0,
    duration: 0,
    audio: null,
    error: null
  }),

  actions: {
    loadSong(artist: any, track: any) {
      const songsStore = useSongsStore()
      this.currentArtist = artist
      this.currentTrack = track
      this.error = null

      if (this.audio) {
        this.audio.pause()
        this.audio.src = ''
      }

      this.audio = new Audio()
      
      // Add event listeners for audio
      this.audio.addEventListener('error', (e) => {
        console.error('Error loading audio:', e)
        this.error = 'Error loading audio file'
        this.isPlaying = false
      })

      this.audio.addEventListener('loadeddata', () => {
        this.duration = this.audio?.duration || 0
      })

      this.audio.addEventListener('timeupdate', () => {
        if (this.audio) {
          this.progress = this.audio.currentTime
        }
      })

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false
        this.progress = 0
        // Auto play next song
        this.nextSong(this.currentTrack)
      })

      // Set volume
      this.audio.volume = this.volume / 100

      // Load the audio file
      this.audio.src = track.path

      // Add to recently played
      songsStore.addToRecentlyPlayed(track)

      // Play the audio
      this.audio.play().then(() => {
        this.isPlaying = true
      }).catch((error) => {
        console.error('Error playing audio:', error)
        this.error = 'Error playing audio file'
        this.isPlaying = false
      })
    },

    playOrPauseSong() {
      if (!this.audio) return

      if (this.audio.paused) {
        this.audio.play().then(() => {
          this.isPlaying = true
        }).catch((error) => {
          console.error('Error playing audio:', error)
          this.error = 'Error playing audio file'
          this.isPlaying = false
        })
      } else {
        this.audio.pause()
        this.isPlaying = false
      }
    },

    playOrPauseThisSong(artist: any, track: any) {
      if (!this.audio || !this.audio.src || (this.currentTrack?.id !== track.id)) {
        this.loadSong(artist, track)
        return
      }

      this.playOrPauseSong()
    },

    prevSong(currentTrack: any) {
      const songsStore = useSongsStore()
      const track = songsStore.artist.tracks[currentTrack.id - 2]
      if (track) {
        this.loadSong(songsStore.artist, track)
      }
    },

    nextSong(currentTrack: any) {
      const songsStore = useSongsStore()
      if (currentTrack.id === songsStore.artist.tracks.length) {
        const track = songsStore.artist.tracks[0]
        this.loadSong(songsStore.artist, track)
      } else {
        const track = songsStore.artist.tracks[currentTrack.id]
        if (track) {
          this.loadSong(songsStore.artist, track)
        }
      }
    },

    setVolume(volume: number) {
      this.volume = volume
      if (this.audio) {
        this.audio.volume = volume / 100
      }
    },

    seekTo(time: number) {
      if (this.audio) {
        this.audio.currentTime = time
        this.progress = time
      }
    }
  }
}) 