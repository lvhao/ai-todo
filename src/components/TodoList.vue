<template>
  <div class="h-screen flex bg-white dark:bg-gray-900 transition-colors duration-200">
    <!-- 左侧边栏 -->
    <div class="w-64 border-r border-gray-100 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900/50">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-blue-400 
                      flex items-center justify-center text-white font-medium
                      ring-2 ring-white dark:ring-gray-800 shadow-md
                      hover:shadow-lg hover:scale-105 transition-all duration-300">
            LH
          </div>
          <span class="text-lg font-medium bg-gradient-to-r from-teal-500 to-blue-500 
                      bg-clip-text text-transparent">lvhao</span>
        </div>
        <div class="flex items-center gap-2">
          <button @click="handleReset" 
                  class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                         transition-all duration-200"
                  :class="{ 'animate-reset': isResetting }">
            <!-- 重置按钮 -->
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round"
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button @click="toggleDark()" 
                  class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                         transition-colors duration-200 relative group">
            <!-- 月亮图标（暗色模式） -->
            <svg class="w-5 h-5 text-gray-500 dark:text-yellow-500 transition-transform duration-500
                        rotate-0 scale-100 dark:rotate-[360deg] dark:scale-0"
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 3a9 9 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            
            <!-- 太阳图标（亮色模式） -->
            <svg class="w-5 h-5 text-gray-500 dark:text-yellow-500 transition-transform duration-500
                        absolute top-1.5 left-1.5
                        rotate-[360deg] scale-0 dark:rotate-0 dark:scale-100"
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            
            <!-- 悬停提示 -->
            <span class="absolute left-full ml-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 
                           text-white text-xs rounded opacity-0 group-hover:opacity-100
                           transition-opacity duration-200 whitespace-nowrap">
              {{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}
            </span>
          </button>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="relative mb-6">
        <input type="text" 
               v-model="searchQuery"
               placeholder="搜索"
               class="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-gray-800/50 rounded-xl
                      border border-gray-100 dark:border-gray-700
                      focus:ring-2 focus:ring-teal-500/50 dark:text-gray-300
                      shadow-sm hover:shadow transition-shadow duration-200" />
        <svg class="w-5 h-5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <!-- 添加清除按钮 -->
        <button 
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 侧边栏菜单 -->
      <nav class="space-y-2.5">
        <a href="#" 
           @click.prevent="currentFilter = 'all'"
           :class="[
             'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-sm',
             currentFilter === 'all' 
               ? 'text-teal-600 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 dark:text-teal-400 shadow-sm'
               : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
           ]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>全部待办</span>
        </a>
        <a href="#" 
           @click.prevent="currentFilter = 'today'"
           :class="[
             'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
             currentFilter === 'today' 
               ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-500'
               : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
           ]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>今日待办</span>
        </a>
        <a href="#" 
           @click.prevent="currentFilter = 'week'"
           :class="[
             'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
             currentFilter === 'week'
               ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-500'
               : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
           ]">
          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>最近待办</span>
        </a>
      </nav>
    </div>

    <!-- 右侧主内容区 -->
    <div class="flex-1 flex flex-col bg-gray-50/50 dark:bg-gray-900/30">
      <!-- 输入区 -->
      <div class="p-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <div class="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <input
            v-model="newTodo"
            @keyup.enter="addTodo"
            type="text"
            placeholder="在此添加内容，按回车创建事件"
            class="w-full bg-transparent border-0 focus:ring-0 dark:text-gray-300 
                   placeholder-gray-400 py-1 px-2"
          />
        </div>
      </div>

      <!-- Todo列表区 -->
      <div class="flex-1 overflow-auto p-5">
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg font-medium text-gray-700 dark:text-gray-300">
              {{ 
                searchQuery 
                  ? '搜索结果' 
                  : currentFilter === 'today' 
                    ? '今日待办' 
                    : currentFilter === 'week' 
                      ? '最近待办' 
                      : '全部待办' 
              }}
            </span>
            <span class="text-sm text-gray-500">{{ filteredTodos.length }}</span>
          </div>
          
          <draggable 
            :list="filteredTodos"
            item-key="id"
            class="space-y-1"
            :animation="200"
            ghost-class="ghost-item"
            drag-class="dragging"
            handle=".drag-handle"
            :group="{ name: 'todos' }"
            :force-fallback="true"
            :fallback-class="false"
            :fallback-on-body="true"
            :disabled="!!searchQuery"
            @start="handleDragStart"
            @end="handleDragEnd"
          >
            <template #item="{ element }">
              <div class="flex items-center gap-3 px-3 py-2 bg-white dark:bg-gray-900 
                          hover:bg-gray-50/80 dark:hover:bg-gray-800/50 
                          rounded-lg group transition-colors duration-200
                          border border-transparent hover:border-gray-100 dark:hover:border-gray-700
                          shadow-sm hover:shadow transition-all duration-200"
                   :data-todo-id="element.id">
                <div class="drag-handle flex items-center justify-center w-6 h-6 
                            text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                            cursor-grab active:cursor-grabbing active:scale-95 
                            transition-all duration-200 rounded-md 
                            hover:bg-gray-100 dark:hover:bg-gray-800"
                     :class="{ 'opacity-50 cursor-not-allowed': !!searchQuery }">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M8 9h8M8 15h8" />
                  </svg>
                </div>
                <input type="checkbox" 
                       v-model="element.completed"
                       class="w-4 h-4 rounded border-gray-300 dark:border-gray-600
                              text-teal-600 focus:ring-teal-500" />
                <div class="flex flex-1 items-center gap-4">
                  <div class="text-gray-700 dark:text-gray-300 flex-1" 
                       :class="{ 'line-through text-gray-400 dark:text-gray-500': element.completed }">
                    {{ element.text }}
                  </div>
                  <div class="relative group">
                    <div class="flex items-center gap-1 text-sm text-gray-400 
                              group-hover:text-teal-500 cursor-pointer 
                              transition-colors duration-200">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{{ formatDate(element.date) }}</span>
                    </div>
                    <input 
                      type="date" 
                      :value="formatDateForInput(element.date)"
                      @change="(e: Event) => updateTodoDate(element.id, new Date((e.target as HTMLInputElement).value))"
                      class="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                  </div>
                </div>
                <button @click="handleDelete(element.id)" 
                        class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500
                               transition-opacity duration-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!-- 底部计时器区 -->
      <div class="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <!-- 动画背景 -->
        <div v-show="isTimerRunning" class="absolute inset-0 pointer-events-none">
          <!-- 海浪动画 -->
          <svg v-if="currentAnimation === 'ocean'" 
              class="waves" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 24 150 28" 
              preserveAspectRatio="none">
            <defs>
              <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="wave-group">
              <use href="#wave" class="wave1" x="50" y="3" fill="rgba(20, 184, 166, 0.15)" />
              <use href="#wave" class="wave2" x="50" y="0" fill="rgba(20, 184, 166, 0.1)" />
              <use href="#wave" class="wave3" x="50" y="2" fill="rgba(20, 184, 166, 0.05)" />
            </g>
          </svg>

          <!-- 雷雨动画 -->
          <div v-else-if="currentAnimation === 'thunder'" class="thunder-container">
            <!-- 雨滴 -->
            <div v-for="n in 20" :key="n" 
                 class="thunder-rain-drop"
                 :style="{
                   left: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 1.5}s`,
                   animationDuration: '0.8s'
                 }">
            </div>
            <!-- 闪电 -->
            <div class="lightning"></div>
          </div>

          <!-- 阳光动画 -->
          <div v-else-if="currentAnimation === 'sunshine'" class="sunshine-container">
            <div class="fire-wrapper">
              <div class="fire-base"></div>
              <div class="fire-center"></div>
            </div>
            <div class="fire-particles">
              <div v-for="n in 20" :key="n" 
                   :class="`fire-particle-${n}`">
              </div>
            </div>
          </div>
        </div>

        <!-- 计时器内容 -->
        <div class="flex items-center justify-between relative z-10">
          <div>
            <div class="text-gray-700 dark:text-gray-300">
              {{ isTimerRunning ? '专注中...' : '待开始' }}
            </div>
            <div class="text-sm text-gray-500">今日番茄收成: {{ todayPomodoros }}</div>
          </div>
          
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 mb-1">
              <!-- 添加倒计时图标 -->
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ formatTime(timeLeft) }}
            </div>
            <div class="flex items-center justify-center gap-1 text-sm text-gray-500">
              <!-- 根据当前动画显示对应图标 -->
              <svg v-if="currentAnimation === 'ocean'"
                   class="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 14.8c2 0 3-1.2 5-1.2s3 1.2 5 1.2 3-1.2 5-1.2 3 1.2 5 1.2M4 18.8c2 0 3-1.2 5-1.2s3 1.2 5 1.2 3-1.2 5-1.2 3 1.2 5 1.2M4 10.8c2 0 3-1.2 5-1.2s3 1.2 5 1.2 3-1.2 5-1.2 3 1.2 5 1.2" />
              </svg>
              <svg v-else-if="currentAnimation === 'thunder'"
                   class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <svg v-else-if="currentAnimation === 'sunshine'"
                   class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span class="flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           transition-all duration-200 group"
                    @click="toggleAnimation">
                {{ animationNames[currentAnimation] }}
                <svg class="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300
                           transition-transform duration-200 group-hover:rotate-180"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

          <button 
            @click="isTimerRunning ? stopPomodoro() : startPomodoro()"
            class="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                   dark:focus:ring-offset-gray-900 transition-colors duration-200
                   cursor-pointer hover:scale-105 transform transition-transform duration-200"
          >
            {{ isTimerRunning ? '停止专注' : '番茄专注' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'
import { useDark } from '@vueuse/core'
import draggable from 'vuedraggable'
import { useTodos } from '../composables/useTodos'
import { defaultTodos } from '../data/defaultTodos'

const isDark = useDark()
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}

// 使用 useTodos 组合式函数
const { 
  todos, 
  searchQuery, 
  currentFilter, 
  filteredTodos, 
  addTodo: addTodoFn, 
  deleteTodo, 
  handleDragEnd, 
  updateTodoDate, 
  handleDragStart 
} = useTodos()

// 定义所有的 ref
const isResetting = ref(false)
const newTodo = ref('')

// 添加番茄钟相关的状
const isTimerRunning = ref(false)
const timeLeft = ref(25 * 60)
const timerInterval = ref<number | null>(null)
const todayPomodoros = ref(0)

// 动画类型
type AnimationType = 'ocean' | 'thunder' | 'sunshine'
const currentAnimation = ref<AnimationType>('ocean')
const animationNames = {
  ocean: '海洋',
  thunder: '雷雨',
  sunshine: '阳光'
}

// 切换动画
function toggleAnimation() {
  const animations: AnimationType[] = ['ocean', 'thunder', 'sunshine']
  const currentIndex = animations.indexOf(currentAnimation.value)
  currentAnimation.value = animations[(currentIndex + 1) % animations.length]
}

// 修改添加待办事项的方法
const addTodo = () => {
  if (!newTodo.value.trim()) return
  addTodoFn(newTodo.value)
  newTodo.value = ''
}

// 格式化时间显示
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

// 在组件卸载时清理定时器
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})

// 请求通知权限
onMounted(() => {
  if (Notification.permission === 'default') {
    Notification.requestPermission()
  }
  // 本地存储加载今日番茄数
  const saved = localStorage.getItem('todayPomodoros')
  if (saved) {
    todayPomodoros.value = parseInt(saved)
  }
})

// 重置��办事项
const handleReset = () => {
  isResetting.value = true
  
  // 第一阶段：任务掉落消失
  todos.value.forEach((_, index) => {
    setTimeout(() => {
      const el = document.querySelector(`[data-todo-id="${todos.value[index].id}"]`)
      if (el) {
        el.classList.add('animate-fall-out')
      }
    }, index * 50)  // 减少错开时间
  })
  
  // 等待消失动画完成后，再加载新任务
  setTimeout(() => {
    localStorage.removeItem('todos')
    todos.value = defaultTodos.map(todo => ({
      ...todo,
      date: todo.date ? new Date(todo.date.getTime()) : null
    }))
    
    // 第二阶段：新任务从上方掉落
    todos.value.forEach((_, index) => {
      setTimeout(() => {
        const el = document.querySelector(`[data-todo-id="${todos.value[index].id}"]`)
        if (el) {
          el.classList.add('animate-drop')
        }
      }, index * 50)  // 减少错开时间
    })
    
    // 清理动画类
    setTimeout(() => {
      isResetting.value = false
      document.querySelectorAll('.animate-fall-out, .animate-drop').forEach(el => {
        el.classList.remove('animate-fall-out', 'animate-drop')
      })
    }, todos.value.length * 50 + 400)
  }, 400)  // 减少等待时间
}

// Todo 相关
const handleDelete = (id: number) => {
  deleteTodo(id)
}

// 格式化日期
const formatDate = (date: Date | null): string => {
  if (!date) return '无日期'
  
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  const dateObj = new Date(date)
  
  // 如果是今天
  if (dateObj.getTime() === today.getTime()) {
    return '今天'
  }
  
  // 如果是明天
  if (dateObj.getTime() === tomorrow.getTime()) {
    return '明天'
  }
  
  // 如果是本周
  const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  if (dateObj <= weekEnd) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return days[dateObj.getDay()]
  }
  
  // 其他日期显示完整格式
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
}

// 添加番茄钟相关的方法
const startPomodoro = () => {
  if (isTimerRunning.value) return
  
  isTimerRunning.value = true
  timeLeft.value = 25 * 60
  
  timerInterval.value = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      stopPomodoro(true)
      // 播放提示音
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
      audio.play()
      // 显示通知
      if (Notification.permission === 'granted') {
        new Notification('番茄时间到！', {
          body: '息一下吧！',
          icon: '/vite.svg'
        })
      }
    }
  }, 1000)
}

const stopPomodoro = (completed = false) => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  isTimerRunning.value = false
  timeLeft.value = 25 * 60  // 重置为25分钟
  
  if (completed) {
    todayPomodoros.value++
    localStorage.setItem('todayPomodoros', todayPomodoros.value.toString())
  }
}

// 格式化日期输入框
const formatDateForInput = (date: Date | null): string => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  margin-left: auto;
  color: #ff4444;
}

@keyframes reset {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
}

.animate-reset {
  animation: reset 1s ease-in-out;
}

/* 添加波浪动画样式 */
.waves {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  min-height: 50px;
  max-height: 100px;
}

.wave-group {
  animation: move-forever 12s linear infinite;
}

.wave1 {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.wave2 {
  animation: move-forever 20s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  animation-delay: -2s;
}

.wave3 {
  animation: move-forever 15s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  animation-delay: -3s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/* 添加过渡效果 */
.waves {
  transition: opacity 0.3s ease;
}

/* 修改拖拽相关样式 */
.ghost-item {
  @apply bg-gray-100/50 dark:bg-gray-800/50 
         border-2 border-dashed border-gray-300 dark:border-gray-600
         transform scale-[0.98] opacity-50;
  animation: ghost-animation 0.2s ease-in-out;
}

.dragging {
  @apply opacity-90 shadow-lg scale-[1.02];
  animation: grab-animation 0.2s ease-in-out;
}

/* 添加拖拽动画 */
@keyframes ghost-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.98);
    opacity: 0.5;
  }
}

@keyframes grab-animation {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.02);
  }
}

/* 拖拽时禁用文本选择 */
.drag-handle {
  user-select: none;
  -webkit-user-select: none;
}

/* 拖拽时的过渡效果 */
.todo-item {
  transition: all 0.2s ease-in-out;
}

@keyframes reset-item {
  0% {
    transform: perspective(1000px) rotateX(0);
    filter: brightness(1);
  }
  50% {
    transform: perspective(1000px) rotateX(180deg);
    filter: brightness(1.5);
  }
  100% {
    transform: perspective(1000px) rotateX(360deg);
    filter: brightness(1);
  }
}

.animate-reset-item {
  animation: reset-item 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
  backface-visibility: hidden;
}

/* 添加发光效果 */
.animate-reset-item::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(45deg, #00ffcc, #0099ff, #6600ff);
  opacity: 0;
  border-radius: 8px;
  z-index: -1;
  animation: glow 0.8s ease-in-out;
}

@keyframes glow {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.5; }
}

/* 优化文字掉落消失动画 */
@keyframes fall-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
  }
}

.animate-fall-out {
  animation: fall-out 0.4s ease-in forwards;
  transform-origin: center;
  will-change: transform, opacity;
}

/* 优化掉落动画 */
@keyframes drop {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-drop {
  animation: drop 0.3s ease-out forwards;
  will-change: transform, opacity;
}

/* 阳光动画 */
.sunshine-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.05);
  transform: translateZ(0);
  animation: fire-wrapper 4s ease-in-out infinite;
}

.fire-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform-origin: center bottom;
}

/* 阳光基础层 */
.fire-base {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, 
    rgba(249, 115, 22, 0.3),
    rgba(251, 146, 60, 0.2) 50%,
    rgba(253, 186, 116, 0.1)
  );
  filter: blur(4px);
  animation: fire-base 2s ease-in-out infinite;
}

.fire-center {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top,
    rgba(249, 115, 22, 0.4) 20%,
    rgba(251, 146, 60, 0.2) 60%,
    rgba(253, 186, 116, 0.1)
  );
  transform-origin: center bottom;
  animation: fire-wave 2.5s ease-in-out infinite alternate;
  filter: blur(3px);
}

/* 阳光粒子 */
.fire-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.fire-particle-1,
.fire-particle-2 {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(251, 146, 60, 0.6);
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0;
}

/* 阳光粒子 - 手动定义20个粒子 */
.fire-particle-1 { left: 5%; animation: fire-rise 2s ease-out infinite; animation-delay: 0.2s; }
.fire-particle-2 { left: 15%; animation: fire-rise 2.2s ease-out infinite; animation-delay: 0.4s; }
.fire-particle-3 { left: 25%; animation: fire-rise 2.2s ease-out infinite; animation-delay: 0.8s; }
.fire-particle-4 { left: 35%; animation: fire-rise 2.6s ease-out infinite; animation-delay: 0.3s; }
.fire-particle-5 { left: 45%; animation: fire-rise 2.4s ease-out infinite; animation-delay: 0.7s; }
.fire-particle-6 { left: 55%; animation: fire-rise 2.7s ease-out infinite; animation-delay: 0.4s; }
.fire-particle-7 { left: 65%; animation: fire-rise 2.3s ease-out infinite; animation-delay: 0.6s; }
.fire-particle-8 { left: 75%; animation: fire-rise 2.9s ease-out infinite; animation-delay: 0.1s; }
.fire-particle-9 { left: 85%; animation: fire-rise 2.5s ease-out infinite; animation-delay: 0.9s; }
.fire-particle-10 { left: 95%; animation: fire-rise 2.6s ease-out infinite; animation-delay: 0.2s; }
.fire-particle-11 { left: 10%; animation: fire-rise 2.4s ease-out infinite; animation-delay: 1.0s; }
.fire-particle-12 { left: 20%; animation: fire-rise 2.8s ease-out infinite; animation-delay: 0.3s; }
.fire-particle-13 { left: 30%; animation: fire-rise 2.3s ease-out infinite; animation-delay: 0.7s; }
.fire-particle-14 { left: 40%; animation: fire-rise 2.7s ease-out infinite; animation-delay: 0.4s; }
.fire-particle-15 { left: 50%; animation: fire-rise 2.5s ease-out infinite; animation-delay: 0.8s; }
.fire-particle-16 { left: 60%; animation: fire-rise 2.9s ease-out infinite; animation-delay: 0.2s; }
.fire-particle-17 { left: 70%; animation: fire-rise 2.4s ease-out infinite; animation-delay: 0.6s; }
.fire-particle-18 { left: 80%; animation: fire-rise 2.6s ease-out infinite; animation-delay: 0.9s; }
.fire-particle-19 { left: 90%; animation: fire-rise 2.3s ease-out infinite; animation-delay: 0.3s; }
.fire-particle-20 { left: 100%; animation: fire-rise 2.7s ease-out infinite; animation-delay: 0.5s; }

/* 所有阳光粒子的基础样式 */
[class^="fire-particle-"] {
  position: absolute;
  bottom: 0;
  opacity: 0;
}

@keyframes fire-wave {
  0% {
    transform: scaleY(1) translateY(0) skewX(-2deg);
  }
  50% {
    transform: scaleY(1.1) translateY(-10px) skewX(2deg);
  }
  100% {
    transform: scaleY(1.05) translateY(-5px) skewX(-1deg);
  }
}

@keyframes fire-rise {
  0% {
    transform: translateY(0) scale(1) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) scale(0) rotate(360deg);
    opacity: 0;
  }
}

@keyframes fire-wrapper {
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
}

@keyframes fire-base {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.05); }
}

/* 雷雨动画样式 */
.thunder-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.05);
  transform: translateZ(0);
}

.thunder-rain-drop {
  position: absolute;
  top: -10px;
  width: 2px;
  height: 20px;
  background: rgba(234, 179, 8, 0.4);  /* yellow-500 with opacity */
  animation: thunder-rain-fall linear infinite;
  transform: rotate(20deg);
  will-change: transform;
}

.lightning {
  position: absolute;
  inset: 0;
  background: transparent;
  animation: lightning 8s linear infinite;
  will-change: background;
  transform: translateZ(0);
}

@keyframes thunder-rain-fall {
  0% {
    transform: translate3d(0, -20px, 0) rotate(20deg);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 120px, 0) rotate(20deg);
    opacity: 0.3;
  }
}

@keyframes lightning {
  0%, 20%, 40%, 60%, 80%, 100% {
    background: transparent;
  }
  19.9%, 39.9%, 59.9%, 79.9% {
    background: rgba(234, 179, 8, 0.05);  /* yellow-500 with opacity */
  }
  20%, 40%, 60%, 80% {
    background: rgba(234, 179, 8, 0.1);
  }
}
</style> 
