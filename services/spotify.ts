import { useAuthStore } from '~/stores/auth'

export const useSpotifyApi = () => {
  const authStore = useAuthStore()

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    if (!authStore.accessToken) {
      throw new Error('No access token available')
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

  const getRecentlyPlayed = async () => {
    return fetchWithAuth('/me/player/recently-played?limit=5')
  }

  const getTopTracks = async () => {
    return fetchWithAuth('/me/top/tracks?limit=5&time_range=short_term')
  }

  const getPlaylists = async () => {
    return fetchWithAuth('/me/playlists?limit=5')
  }

  const getRecommendations = async () => {
    // Get user's top tracks to use as seed for recommendations
    const topTracks = await getTopTracks()
    const seedTracks = topTracks.items.slice(0, 5).map((track: any) => track.id).join(',')
    
    return fetchWithAuth(`/recommendations?limit=5&seed_tracks=${seedTracks}`)
  }

  const searchTracks = async (query: string) => {
    return fetchWithAuth(`/search?q=${encodeURIComponent(query)}&type=track&limit=5`)
  }

  return {
    getRecentlyPlayed,
    getTopTracks,
    getPlaylists,
    getRecommendations,
    searchTracks
  }
} 