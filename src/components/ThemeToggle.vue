<!-- 主题切换按钮组件 -->
<template>
  <button @click="toggleDark()" 
          class="theme-toggle-btn group">
    <DarkIcon class="theme-icon" :class="darkIconClass" />
    <LightIcon class="theme-icon absolute" :class="lightIconClass" />
    <span class="tooltip">
      {{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { computed } from 'vue'
import { DarkIcon, LightIcon } from '@/icons'

const isDark = useDark()
const toggleDark = () => document.documentElement.classList.toggle('dark')

const darkIconClass = computed(() => ({
  'rotate-0 scale-100 dark:rotate-[360deg] dark:scale-0': true
}))

const lightIconClass = computed(() => ({
  'top-1.5 left-1.5 rotate-[360deg] scale-0 dark:rotate-0 dark:scale-100': true
}))
</script>

<style scoped>
.theme-toggle-btn {
  @apply p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
         transition-colors duration-200 relative;
}

.theme-icon {
  @apply w-5 h-5 text-gray-500 dark:text-yellow-500 transition-transform duration-500;
}

.tooltip {
  @apply absolute left-full ml-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 
         text-white text-xs rounded opacity-0 group-hover:opacity-100
         transition-opacity duration-200 whitespace-nowrap;
}
</style> 