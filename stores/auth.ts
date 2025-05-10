import { defineStore } from 'pinia'

interface AuthState {
  isAuthenticated: boolean
  user: {
    email: string | null
  } | null
  accessToken: string | null
  refreshToken: string | null
  expiresIn: number | null
  tokenTimestamp: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    tokenTimestamp: null
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        // Here you would typically make an API call to authenticate the user
        // For now, we'll just set the authentication state
        this.isAuthenticated = true
        this.user = { email }
        console.log('User logged in:', email)
      } catch (error) {
        console.error('Error logging in:', error)
        throw error
      }
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.expiresIn = null
      this.tokenTimestamp = null
      console.log('User logged out')
    },

    setTokens(accessToken: string, refreshToken: string, expiresIn: number) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.expiresIn = expiresIn
      this.tokenTimestamp = Date.now()
      this.isAuthenticated = true
      console.log('Tokens set successfully')
    },

    async refreshAccessToken() {
      if (!this.refreshToken) {
        console.error('No refresh token available')
        return
      }

      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: this.refreshToken }),
        })

        if (!response.ok) {
          throw new Error('Failed to refresh token')
        }

        const data = await response.json()
        this.setTokens(data.access_token, data.refresh_token, data.expires_in)
        return data
      } catch (error) {
        console.error('Error refreshing token:', error)
        this.logout()
        throw error
      }
    }
  }
}) 