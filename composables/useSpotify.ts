import { useAuthStore } from '~/stores/auth'

export const useSpotify = () => {
  const authStore = useAuthStore()

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    if (authStore.tokenExpired) {
      await authStore.refreshAccessToken()
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`)
    }

    return response.json()
  }

  const search = async (query: string, types: string[] = ['track', 'artist', 'album', 'playlist']) => {
    return fetchWithAuth(`/search?q=${encodeURIComponent(query)}&type=${types.join(',')}`)
  }

  const getCurrentUser = async () => {
    return fetchWithAuth('/me')
  }

  const getUserPlaylists = async () => {
    return fetchWithAuth('/me/playlists')
  }

  const getPlaylist = async (playlistId: string) => {
    return fetchWithAuth(`/playlists/${playlistId}`)
  }

  const getTrack = async (trackId: string) => {
    return fetchWithAuth(`/tracks/${trackId}`)
  }

  const getArtist = async (artistId: string) => {
    return fetchWithAuth(`/artists/${artistId}`)
  }

  const getAlbum = async (albumId: string) => {
    return fetchWithAuth(`/albums/${albumId}`)
  }

  const getCurrentPlayback = async () => {
    return fetchWithAuth('/me/player')
  }

  const startPlayback = async (contextUri?: string, uris?: string[]) => {
    return fetchWithAuth('/me/player/play', {
      method: 'PUT',
      body: JSON.stringify({
        context_uri: contextUri,
        uris: uris,
      }),
    })
  }

  const pausePlayback = async () => {
    return fetchWithAuth('/me/player/pause', {
      method: 'PUT',
    })
  }

  const skipToNext = async () => {
    return fetchWithAuth('/me/player/next', {
      method: 'POST',
    })
  }

  const skipToPrevious = async () => {
    return fetchWithAuth('/me/player/previous', {
      method: 'POST',
    })
  }

  const setVolume = async (volume: number) => {
    return fetchWithAuth(`/me/player/volume?volume_percent=${volume}`, {
      method: 'PUT',
    })
  }

  return {
    search,
    getCurrentUser,
    getUserPlaylists,
    getPlaylist,
    getTrack,
    getArtist,
    getAlbum,
    getCurrentPlayback,
    startPlayback,
    pausePlayback,
    skipToNext,
    skipToPrevious,
    setVolume,
  }
} 