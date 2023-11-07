export default function convertTime(durationMinutes) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = Math.floor(durationMinutes % 60);
  return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч ${minutes}м`)
}
