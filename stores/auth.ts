import { defineStore } from 'pinia'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'

interface AuthState {
  isAuthenticated: boolean
  currentUser: User | null
  username: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    currentUser: null,
    username: null
  }),

  actions: {
    async signup(email: string, password: string, username: string) {
      const { $auth } = useNuxtApp()
      try {
        const userCredential = await createUserWithEmailAndPassword($auth, email, password)
        this.currentUser = userCredential.user
        this.isAuthenticated = true
        this.username = username
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          throw new Error('Email is already registered')
        }
        throw new Error(error.message)
      }
    },

    async login(email: string, password: string) {
      const { $auth } = useNuxtApp()
      try {
        const userCredential = await signInWithEmailAndPassword($auth, email, password)
        this.currentUser = userCredential.user
        this.isAuthenticated = true
      } catch (error: any) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          throw new Error('Invalid email or password')
        }
        throw new Error(error.message)
      }
    },

    async logout() {
      const { $auth } = useNuxtApp()
      try {
        await signOut($auth)
        this.currentUser = null
      this.isAuthenticated = false
      } catch (error: any) {
        throw new Error(error.message)
      }
    }
  }
}) 