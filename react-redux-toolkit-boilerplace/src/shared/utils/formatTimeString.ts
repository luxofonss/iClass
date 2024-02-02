export default function formatTimeString(time: string) {
  const date = new Date(time)

  date.setHours(date.getHours() - 7)
  return date.toLocaleString()
}
