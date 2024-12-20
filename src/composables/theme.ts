import { ref, watch } from 'vue'

export function useTheme() {
  const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  watch(isDark, (val) => {
    if (val) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, { immediate: true })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
} 