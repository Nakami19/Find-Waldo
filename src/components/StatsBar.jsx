/**
 * StatsBar — Displays the elapsed time and mistake count.
 *
 * @param {{ elapsed: number, mistakes: number }} props
 */
function StatsBar({ elapsed, mistakes }) {
  /**
   * Formats elapsed seconds into mm:ss.
   * Example: 125 → "02:05"
   */
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="flex gap-8 mb-4 text-white font-bold text-xl">
      <div className="bg-white/20 backdrop-blur rounded-xl px-5 py-2 shadow">
        ⏱️ {formatTime(elapsed)}
      </div>
      <div className="bg-white/20 backdrop-blur rounded-xl px-5 py-2 shadow">
        ❌ {mistakes}
      </div>
    </div>
  )
}

export default StatsBar
