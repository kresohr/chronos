export function formatMinutesToHHmm(minutes: number) {
  if (minutes) {
    const HH = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0')
    const mm = (minutes % 60).toString().padStart(2, '0')
    return `${HH}h ${mm}m`
  } else {
    return '0'
  }
}
