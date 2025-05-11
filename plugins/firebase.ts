import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyA77IIjS9TSOdqgPjgm83_uPCX0ULPU6Ew",
    authDomain: "spotify-clone-ea083.firebaseapp.com",
    projectId: "spotify-clone-ea083",
    storageBucket: "spotify-clone-ea083.firebasestorage.app",
    messagingSenderId: "848052216420",
    appId: "1:848052216420:web:ee7eb8550219a13dbd7571"
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  // Handle auth state changes
  onAuthStateChanged(auth, (user) => {
    const authStore = useAuthStore()
    authStore.currentUser = user
    authStore.isAuthenticated = !!user
  })

  return {
    provide: {
      firebase: app,
      auth,
      db
    }
  }
}) 