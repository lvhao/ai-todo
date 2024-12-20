import { ref, computed, nextTick } from 'vue'
import type { Todo } from '../types'
import { formatDate } from '../utils/date'
import { loadTodos, saveTodos } from '../utils/storage'
import { defaultTodos } from '../data/defaultTodos'

export type FilterType = 'all' | 'today' | 'week'

export const useTodos = () => {
  // 修改这里，如果没有本地存储的数据，使用默认数据
  const todos = ref<Todo[]>(loadTodos() || defaultTodos)
  const searchQuery = ref('')
  const currentFilter = ref<FilterType>('all')  // 确保默认值为 'all'

  const filteredTodos = computed(() => {
    let filtered = todos.value

    // 先按 order 字段排序
    filtered = [...filtered].sort((a, b) => a.order - b.order)

    // 再按日期筛选
    if (currentFilter.value !== 'all') {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

      filtered = filtered.filter(todo => {
        if (!todo.date) return false
        const todoDate = todo.date instanceof Date ? todo.date : new Date(todo.date)
        todoDate.setHours(0, 0, 0, 0)
        
        if (currentFilter.value === 'today') {
          return todoDate.getTime() === today.getTime()
        } else if (currentFilter.value === 'week') {
          return todoDate.getTime() >= tomorrow.getTime() && todoDate.getTime() <= weekEnd.getTime()
        }
        return true
      })
    }

    // 最后按搜索关键词筛选
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(todo => {
        const text = todo.text.toLowerCase()
        const date = formatDate(todo.date).toLowerCase()
        return text.includes(query) || date.includes(query)
      })
    }

    return filtered
  })

  function addTodo(text: string) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    // 获取最大的 order 值
    const maxOrder = Math.max(0, ...todos.value.map(t => t.order))
    
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      date: today,
      order: maxOrder + 1  // 新项放到最后
    }
    todos.value.push(newTodo)
    saveTodos(todos.value)
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id)
    saveTodos(todos.value)
  }

  function handleDragStart() {
    // 打印拖拽前的顺序
    console.log('拖拽前:', todos.value.map(todo => `${todo.id}:${todo.text}`).join(' → '))
  }

  function handleDragEnd(evt: any) {
    const { oldIndex, newIndex } = evt
    if (oldIndex === newIndex) return

    const updatedTodos = [...todos.value]
    
    // 打印拖拽的元素信息
    const draggedItem = updatedTodos[oldIndex]
    console.log('拖拽元素:', `${draggedItem.id}:${draggedItem.text}`, 
                `从位置 ${oldIndex}(order=${draggedItem.order}) 到位置 ${newIndex}`)
    
    if (searchQuery.value) {
      // 在搜索状态下
      const filteredList = filteredTodos.value
      const draggedItem = filteredList[oldIndex]
      
      // 获取原始列表中的实际索引
      const actualOldIndex = updatedTodos.findIndex(t => t.id === draggedItem.id)
      
      // 找到目标位置在原始列表中的索引
      let actualNewIndex
      if (newIndex >= filteredList.length) {
        // 如果拖到末尾，使用最后一个过滤项的索引
        const lastFilteredItem = filteredList[filteredList.length - 1]
        actualNewIndex = updatedTodos.findIndex(t => t.id === lastFilteredItem.id) + 1
      } else {
        const targetItem = filteredList[newIndex]
        actualNewIndex = updatedTodos.findIndex(t => t.id === targetItem.id)
        // 如果是向后拖拽，目标位置需要加1
        if (actualOldIndex < actualNewIndex) {
          actualNewIndex++
        }
      }

      // 移除拖拽项并插入到新位置
      const [itemToMove] = updatedTodos.splice(actualOldIndex, 1)
      updatedTodos.splice(actualNewIndex, 0, itemToMove)
    } else {
      // 非搜索状态下
      // 获取目标位置的 order 值
      const targetOrder = updatedTodos[newIndex].order
      
      if (oldIndex < newIndex) {
        // 向后拖拽：将拖拽项的 order 设为目标位置的 order
        draggedItem.order = targetOrder
        // 中间项的 order 值减1
        for (let i = oldIndex + 1; i <= newIndex; i++) {
          updatedTodos[i].order--
        }
      } else {
        // 向前拖拽：将拖拽项的 order 设为目标位置的 order
        draggedItem.order = targetOrder
        // 中间项的 order 值加1
        for (let i = newIndex; i < oldIndex; i++) {
          updatedTodos[i].order++
        }
      }
      
      // 重新排序数组
      updatedTodos.sort((a, b) => a.order - b.order)
    }

    nextTick(() => {
      todos.value = [...updatedTodos]
    })
    saveTodos(todos.value)
  }

  function updateTodoDate(id: number, newDate: Date) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.date = newDate
      saveTodos(todos.value)
    }
  }

  return {
    todos,
    searchQuery,
    currentFilter,
    filteredTodos,
    addTodo,
    deleteTodo,
    handleDragEnd,
    handleDragStart,
    updateTodoDate
  }
}