import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const publicRoutes = ['/login', '/callback']

  // Allow access to public routes
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  // Check if token needs refresh
  if (authStore.tokenExpired) {
    authStore.refreshAccessToken().catch(() => {
      return navigateTo('/login')
    })
  }
}) 