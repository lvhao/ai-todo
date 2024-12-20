<!-- 头部组件：包含标题、重置和主题切换按钮 -->
<template>
  <div class="flex items-center justify-between mb-6">
    <span class="text-lg font-medium text-teal-600 dark:text-teal-500">lvhao</span>
    <div class="flex items-center gap-2">
      <ResetButton @reset="$emit('reset')" :is-resetting="isResetting" />
      <ThemeToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isResetting: boolean
}>()
defineEmits<{
  (e: 'reset'): void
}>()
</script> 