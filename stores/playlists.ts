import { defineStore } from 'pinia'

interface Playlist {
  id: number
  name: string
  songIds: number[]
  cover: string
  description: string
}

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    playlists: [
      {
        id: 1,
        name: 'Daily Mix 01',
        songIds: [1, 2, 3],
        cover: '/images/image2.png',
        description: 'Aurora, Neon Vibe, Midnight Echoes and more'
      },
      {
        id: 2,
        name: 'Daily Mix 02',
        songIds: [4, 5, 6],
        cover: '/images/image2.png',
        description: 'Synth City, Luna Drive, Chillwave Collective and more'
      },
      {
        id: 3,
        name: 'Daily Mix 03',
        songIds: [7, 8, 9],
        cover: '/images/image2.png',
        description: 'Echo Vision, Dreamscape, Retro Pulse and more'
      },
      {
        id: 4,
        name: 'Daily Mix 04',
        songIds: [1, 4, 7],
        cover: '/images/image2.png',
        description: 'Night Runner, Velvet Sky, Pulse Avenue and more'
      },
      {
        id: 5,
        name: 'Daily Mix 05',
        songIds: [2, 5, 8],
        cover: '/images/image2.png',
        description: 'Stellar Drift, Indigo Sun, Cosmic Beat and more'
      },
      {
        id: 6,
        name: 'Daily Mix 06',
        songIds: [3, 6, 9],
        cover: '/images/image2.png',
        description: 'Vapor Trails, Solar Flare, Electric Dusk and more'
      }
    ],
    nextId: 7
  }),
  actions: {
    createPlaylist(name: string) {
      this.playlists.push({ id: this.nextId++, name, songIds: [], cover: '', description: '' })
    },
    removePlaylist(id: number) {
      this.playlists = this.playlists.filter(p => p.id !== id)
    },
    addSongToPlaylist(playlistId: number, songId: number) {
      const playlist = this.playlists.find(p => p.id === playlistId)
      if (playlist && !playlist.songIds.includes(songId)) {
        playlist.songIds.push(songId)
      }
    },
    removeSongFromPlaylist(playlistId: number, songId: number) {
      const playlist = this.playlists.find(p => p.id === playlistId)
      if (playlist) {
        playlist.songIds = playlist.songIds.filter(id => id !== songId)
      }
    }
  }
}) 