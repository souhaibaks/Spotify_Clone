import { defineStore } from 'pinia'

interface Song {
  id: number
  name: string
  path: string
  category: string
}

interface Artist {
  name: string
  albumCover: string
  releaseYear: string
  tracks: Song[]
}

export const useSongsStore = defineStore('songs', {
  state: () => ({
    artist: {
      name: "The Midnight Owls",
      albumCover: "/images/default-album.svg",
      releaseYear: "2022",
      tracks: [
        {
          id: 1,
          name: "Neon Skies",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          category: "Synthwave"
        },
        {
          id: 2,
          name: "City Lights",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          category: "Pop"
        },
        {
          id: 3,
          name: "Midnight Drive",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          category: "Chill"
        },
        {
          id: 4,
          name: "Electric Dreams",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          category: "Synthwave"
        },
        {
          id: 5,
          name: "Starlit Avenue",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          category: "Pop"
        },
        {
          id: 6,
          name: "Golden Hour",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          category: "Chill"
        },
        {
          id: 7,
          name: "Echoes of You",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          category: "Indie"
        },
        {
          id: 8,
          name: "Lost in the Night",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          category: "Indie"
        },
        {
          id: 9,
          name: "Sunset Boulevard",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          category: "Chill"
        },
        {
          id: 10,
          name: "Afterglow",
          path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
          category: "Synthwave"
        }
      ]
    } as Artist,
    recentlyPlayed: [] as Song[],
    recommended: [] as Song[]
  }),

  actions: {
    getRecentlyPlayed() {
      return this.recentlyPlayed
    },

    getRecommended() {
      // Return all songs as recommended
      this.recommended = [...this.artist.tracks]
      return this.recommended
    },

    addToRecentlyPlayed(song: Song) {
      // Remove the song if it's already in the list
      this.recentlyPlayed = this.recentlyPlayed.filter(s => s.id !== song.id)
      // Add the song to the beginning of the list
      this.recentlyPlayed.unshift(song)
      // Keep only the last 5 songs
      if (this.recentlyPlayed.length > 5) {
        this.recentlyPlayed = this.recentlyPlayed.slice(0, 5)
      }
    }
  }
}) 