import { defineStore } from 'pinia'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: any | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false
  }),

  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.isAuthenticated = true
      // Store tokens in localStorage
      localStorage.setItem('spotify_access_token', accessToken)
      localStorage.setItem('spotify_refresh_token', refreshToken)
    },

    setUser(user: any) {
      this.user = user
      localStorage.setItem('spotify_user', JSON.stringify(user))
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.isAuthenticated = false
      // Clear localStorage
      localStorage.removeItem('spotify_access_token')
      localStorage.removeItem('spotify_refresh_token')
      localStorage.removeItem('spotify_user')
    },

    async refreshAccessToken() {
      if (!this.refreshToken) return false

      try {
        const response = await fetch('/api/refresh-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken: this.refreshToken
          })
        })

        const data = await response.json()
        if (data.access_token) {
          this.setTokens(data.access_token, data.refresh_token || this.refreshToken)
          return true
        }
        return false
      } catch (error) {
        console.error('Error refreshing token:', error)
        return false
      }
    },

    initializeFromStorage() {
      const accessToken = localStorage.getItem('spotify_access_token')
      const refreshToken = localStorage.getItem('spotify_refresh_token')
      const user = localStorage.getItem('spotify_user')

      if (accessToken && refreshToken) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.isAuthenticated = true
      }

      if (user) {
        this.user = JSON.parse(user)
      }
    }
  }
}) 