import { defineStore } from 'pinia'

interface Song {
  id: number
  title: string
  artist: string
  album: string
  cover: string
  duration: string
}

export const useSongsStore = defineStore('songs', {
  state: () => ({
    songs: [
      {
        id: 1,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        duration: "3:53"
      },
      {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        duration: "3:20"
      },
      {
        id: 3,
        title: "Dance Monkey",
        artist: "Tones and I",
        album: "The Kids Are Coming",
        cover: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24c20c2d3a3e9",
        duration: "3:29"
      },
      {
        id: 4,
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        album: "Divinely Uninspired to a Hellish Extent",
        cover: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5",
        duration: "3:02"
      },
      {
        id: 5,
        title: "Don't Start Now",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        cover: "https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e",
        duration: "3:03"
      }
    ] as Song[],
    recentlyPlayed: [] as Song[],
    recommended: [] as Song[]
  }),

  actions: {
    getRecentlyPlayed() {
      // For now, return the first 5 songs as recently played
      this.recentlyPlayed = this.songs.slice(0, 5)
      return this.recentlyPlayed
    },

    getRecommended() {
      // For now, return all songs as recommended
      this.recommended = [...this.songs]
      return this.recommended
    }
  }
}) 