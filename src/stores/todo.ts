import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '../types/todo'
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs'

const STORAGE_FILE = 'todos.json'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  
  async function loadTodos() {
    try {
      const content = await readTextFile(STORAGE_FILE, { dir: BaseDirectory.App })
      todos.value = JSON.parse(content)
    } catch {
      todos.value = []
    }
  }

  async function saveTodos() {
    await writeTextFile(STORAGE_FILE, JSON.stringify(todos.value), { dir: BaseDirectory.App })
  }

  async function addTodo(content: string) {
    const todo: Todo = {
      id: Date.now().toString(),
      content,
      completed: false,
      createdAt: Date.now()
    }
    todos.value.unshift(todo)
    await saveTodos()
  }

  async function removeTodo(id: string) {
    todos.value = todos.value.filter(todo => todo.id !== id)
    await saveTodos()
  }

  async function toggleTodo(id: string) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      await saveTodos()
    }
  }

  return {
    todos,
    loadTodos,
    addTodo,
    removeTodo,
    toggleTodo
  }
}) 