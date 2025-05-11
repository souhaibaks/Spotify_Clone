import { defineStore } from 'pinia'

export const useLikedSongsStore = defineStore('likedSongs', {
  state: () => ({
    liked: [] as number[]
  }),
  actions: {
    likeSong(id: number) {
      if (!this.liked.includes(id)) {
        this.liked.push(id)
      }
    },
    unlikeSong(id: number) {
      this.liked = this.liked.filter(songId => songId !== id)
    },
    isLiked(id: number) {
      return this.liked.includes(id)
    }
  }
}) 