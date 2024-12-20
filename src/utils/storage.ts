// 本地存储工具
import type { Todo } from '../types'

export function loadTodos(): Todo[] | null {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    return JSON.parse(savedTodos, (key, value) => {
      if (key === 'date' && value) {
        return new Date(value)
      }
      return value
    })
  }
  return null
}

export function saveTodos(todos: Todo[]) {
  const todosToSave = todos.map(todo => ({
    ...todo,
    date: todo.date instanceof Date ? todo.date.toISOString() : todo.date
  }))
  localStorage.setItem('todos', JSON.stringify(todosToSave))
}

export function loadTodayPomodoros(): number {
  return Number(localStorage.getItem('todayPomodoros')) || 0
}

export function saveTodayPomodoros(count: number) {
  localStorage.setItem('todayPomodoros', count.toString())
} 