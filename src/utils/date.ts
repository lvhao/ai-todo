// 日期格式化工具
export function formatDate(date: Date | null): string {
  if (!date) return '无日期'
  
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  const dateObj = new Date(date)
  
  if (dateObj.getTime() === today.getTime()) return '今天'
  if (dateObj.getTime() === tomorrow.getTime()) return '明天'
  
  const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  if (dateObj <= weekEnd) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return days[dateObj.getDay()]
  }
  
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
} 