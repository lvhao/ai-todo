// 通知工具
export function notifyCompletion() {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
  audio.play()
  
  if (Notification.permission === 'granted') {
    new Notification('番茄时间到！', {
      body: '休息一下吧！',
      icon: '/vite.svg'
    })
  }
} 