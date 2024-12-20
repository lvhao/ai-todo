<!-- 任务输入组件 -->
<template>
  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
      <PlusIcon class="w-5 h-5 text-gray-400 flex-shrink-0" />
      <input
        v-model="inputValue"
        @keyup.enter="handleSubmit"
        type="text"
        :placeholder="placeholder"
        class="todo-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@/icons'

defineProps<{
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

const inputValue = ref('')

const handleSubmit = () => {
  if (!inputValue.value.trim()) return
  emit('submit', inputValue.value)
  inputValue.value = ''
}
</script>

<style scoped>
.todo-input {
  @apply w-full bg-transparent border-0 focus:ring-0 dark:text-gray-300 
         placeholder-gray-400 py-1 px-2;
}
</style> 