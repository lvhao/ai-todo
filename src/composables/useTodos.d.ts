import type { Ref, ComputedRef } from 'vue'
import type { Todo } from '../types'

export type FilterType = 'all' | 'today' | 'week'

export interface TodosReturn {
  todos: Ref<Todo[]>
  searchQuery: Ref<string>
  currentFilter: Ref<FilterType>
  filteredTodos: ComputedRef<Todo[]>
  addTodo: (text: string) => void
  deleteTodo: (id: number) => void
  handleDragEnd: (evt: any) => void
}

// 使用默认导出声明
declare const useTodos: () => TodosReturn
export default useTodos
