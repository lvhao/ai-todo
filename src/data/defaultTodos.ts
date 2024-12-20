import type { Todo } from '../types'

export const defaultTodos: Todo[] = [
  { id: 1, text: '《娱乐至死》', completed: false, date: new Date(), order: 1 },
  { id: 2, text: '《人的枷锁》', completed: false, date: new Date(), order: 2 },
  { id: 3, text: '《沉思录》', completed: false, date: new Date(Date.now() + 24 * 60 * 60 * 1000), order: 3 },
  { id: 4, text: '《百年孤独》', completed: false, date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), order: 4 },
  { id: 5, text: '《1984》', completed: false, date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), order: 5 },
  { id: 6, text: '《三体》', completed: false, date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), order: 6 },
  { id: 7, text: '《瓦尔登湖》', completed: false, date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), order: 7 },
  { id: 8, text: '《月亮与六便士》', completed: false, date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), order: 8 },
  { id: 9, text: '《追风筝的人》', completed: false, date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), order: 9 },
  { id: 10, text: '《动物农场》', completed: false, date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), order: 10 },
  { id: 11, text: '《局外人》', completed: false, date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), order: 11 },
  { id: 12, text: '《老人与海》', completed: false, date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), order: 12 },
  { id: 13, text: '《麦田里的守望者》', completed: false, date: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000), order: 13 }
] 