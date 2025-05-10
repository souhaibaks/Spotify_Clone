import { useAuthStore } from '../stores/auth'

export const useSpotifyApi = () => {
  const authStore = useAuthStore()

  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    if (!authStore.accessToken) {
      throw new Error('No access token available')
    }

    const baseUrl = 'https://api.spotify.com/v1'
    const url = `${baseUrl}${endpoint}`

    const headers = {
      'Authorization': `Bearer ${authStore.accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      })

      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await authStore.refreshAccessToken()
        if (refreshed) {
          // Retry the request with new token
          return apiFetch(endpoint, options)
        } else {
          throw new Error('Failed to refresh token')
        }
      }

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request error:', error)
      throw error
    }
  }

  return {
    apiFetch
  }
} 