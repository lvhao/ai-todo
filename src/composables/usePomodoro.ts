// 番茄钟相关的组合式函数
import { ref, onUnmounted } from 'vue'
import { formatTime } from '../utils/time'
import { loadTodayPomodoros, saveTodayPomodoros } from '../utils/storage'
import { notifyCompletion } from '../utils/notification'

export function usePomodoro() {
  const isTimerRunning = ref(false)
  const timeLeft = ref(25 * 60)
  const timerInterval = ref<number | null>(null)
  const todayPomodoros = ref(loadTodayPomodoros())

  function startPomodoro() {
    if (isTimerRunning.value) return
    
    isTimerRunning.value = true
    timeLeft.value = 25 * 60
    
    timerInterval.value = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        stopPomodoro(true)
        notifyCompletion()
      }
    }, 1000)
  }

  function stopPomodoro(completed = false) {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
    isTimerRunning.value = false
    timeLeft.value = 25 * 60

    if (completed) {
      todayPomodoros.value++
      saveTodayPomodoros(todayPomodoros.value)
    }
  }

  onUnmounted(() => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
    }
  })

  return {
    isTimerRunning,
    timeLeft,
    todayPomodoros,
    startPomodoro,
    stopPomodoro,
    formatTime
  }
} 