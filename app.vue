<template>
  <div class="min-h-screen bg-black text-white">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="w-64 bg-black border-r border-gray-800 p-6">
        <div class="mb-8">
          <img src="/images/spo.png" alt="Spotify Logo" class="w-36 h-auto" />
        </div>
        <nav class="space-y-4">
          <NuxtLink to="/" class="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="mdi:home" class="w-6 h-6" />
            <span>Home</span>
          </NuxtLink>
          <NuxtLink to="/search" class="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="mdi:magnify" class="w-6 h-6" />
            <span>Search</span>
          </NuxtLink>
          <NuxtLink to="/library" class="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Icon name="mdi:library" class="w-6 h-6" />
            <span>Your Library</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
        <!-- Header Bar -->
        <div class="flex items-center justify-end px-8 py-4 bg-black bg-opacity-80 sticky top-0 z-20">
          <div v-if="authStore.isAuthenticated" class="relative">
            <button id="profile-button" @click="showDropdown = !showDropdown" class="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-black font-bold text-lg focus:outline-none">
              {{ (authStore.username ? authStore.username.charAt(0).toUpperCase() : 'U') }}
            </button>
            <transition name="fade">
              <div v-if="showDropdown" id="profile-dropdown" class="absolute right-0 mt-2 w-64 bg-[#282828] rounded-lg shadow-lg py-2 z-30 border border-gray-700">
                <a @click.prevent="goTo('/account')" href="#" class="flex items-center px-4 py-2 text-white hover:bg-[#3E3D3D] rounded-t-lg">
                  Account
                  <Icon name="mdi:open-in-new" class="ml-auto w-4 h-4 text-gray-400" />
                </a>
                <a @click.prevent="goTo('/profile')" href="#" class="flex items-center px-4 py-2 text-white hover:bg-[#3E3D3D]">Profile</a>
                <a @click.prevent="goTo('/upgrade')" href="#" class="flex items-center px-4 py-2 text-white hover:bg-[#3E3D3D]">Upgrade to Premium</a>
                <a @click.prevent="goTo('/support')" href="#" class="flex items-center px-4 py-2 text-white hover:bg-[#3E3D3D]">
                  Support
                  <Icon name="mdi:open-in-new" class="ml-auto w-4 h-4 text-gray-400" />
                </a>
                <a @click.prevent="goTo('/private-session')" href="#" class="flex items-center px-4 py-2 text-white hover:bg-[#3E3D3D]">Private session</a>
                <a @click.prevent="goTo('/settings')" href="#" class="flex items-center px-4 py-2 text-white hover:bg-[#3E3D3D]">Settings</a>
                <div class="border-t border-gray-700 my-2"></div>
                <a @click.prevent="logout" href="#" class="flex items-center px-4 py-2 text-white hover:bg-[#3E3D3D] rounded-b-lg">Log out</a>
              </div>
            </transition>
          </div>
          <div v-else class="flex items-center space-x-4">
            <NuxtLink to="/signup" class="px-6 py-2 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition">Sign up</NuxtLink>
            <NuxtLink to="/login" class="px-6 py-2 rounded-full bg-black text-white font-bold text-lg border border-white hover:bg-white hover:text-black transition">Log in</NuxtLink>
          </div>
        </div>
        <div class="p-8">
          <NuxtPage />
        </div>
      </div>
    </div>

    <!-- Player -->
    <Player />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

const showDropdown = ref(false)
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

watchEffect(() => {
  if (!authStore.isAuthenticated && route.path !== '/login' && route.path !== '/signup') {
    router.push('/login')
  }
})

function logout() {
  // Clear user session logic here
  // For now, just reload or redirect to login
  // You can replace this with your real logout logic
  window.location.href = '/login'
}

function goTo(path: string) {
  showDropdown.value = false
  router.push(path)
}

// Simple click outside logic using window event
function handleClick(event: MouseEvent) {
  const dropdown = document.getElementById('profile-dropdown')
  const button = document.getElementById('profile-button')
  if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
    showDropdown.value = false
  }
}
if (typeof window !== 'undefined') {
  window.addEventListener('mousedown', handleClick)
}
</script>

<style>
body {
  background-color: #000;
  color: #fff;
}
</style>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
