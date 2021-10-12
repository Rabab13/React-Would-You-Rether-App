export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 4) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}