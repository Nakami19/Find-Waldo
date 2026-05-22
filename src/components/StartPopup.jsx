/**
 * StartPopup — Full-screen modal shown before the game begins.
 *
 * Displays a map-selection carousel with left/right arrows and a
 * "Start Game" button. When the user clicks start, the chosen map
 * level is passed up via onStart(level).
 *
 * This popup appears both on first page load and whenever the user
 * clicks "Play Again" (handled by the parent's started state).
 *
 * @param {{ onStart: (level: string) => void }} props
 */

import { useState } from 'react'
import { MAPS } from '../data/maps'

function StartPopup({ onStart }) {
  /**
   * Index into the MAPS array — determines which map is currently displayed.
   */
  const [mapIndex, setMapIndex] = useState(0)

  /**
   * Moves the carousel to the previous map, wrapping around to the last.
   */
  const prevMap = () => {
    setMapIndex((prev) => (prev === 0 ? MAPS.length - 1 : prev - 1))
  }

  /**
   * Moves the carousel to the next map, wrapping around to the first.
   */
  const nextMap = () => {
    setMapIndex((prev) => (prev === MAPS.length - 1 ? 0 : prev + 1))
  }

  /**
   * Fires the start event with the currently selected map's level string.
   */
  const handleStart = () => {
    onStart(MAPS[mapIndex].level)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 rounded-3xl shadow-2xl p-10 text-center max-w-xl mx-4 border-4 border-white/50">

        {/* Game title */}
        <h2 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
          🌴 Where&apos;s Waldo? 🌴
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Choose a map and find Waldo!
        </p>

        {/* ── Map carousel ── */}
        {/*
          A simple three-column layout: left arrow | map name | right arrow.
          The arrows wrap around (first → last and vice versa).
        */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Left arrow */}
          <button
            onClick={prevMap}
            className="text-4xl text-white hover:scale-125 active:scale-95 transition-transform cursor-pointer select-none"
            aria-label="Previous map"
          >
            ◀
          </button>

          {/* Current map label */}
          <span className="text-2xl font-bold text-white drop-shadow min-w-[160px]">
            {MAPS[mapIndex].label}
          </span>

          {/* Right arrow */}
          <button
            onClick={nextMap}
            className="text-4xl text-white hover:scale-125 active:scale-95 transition-transform cursor-pointer select-none"
            aria-label="Next map"
          >
            ▶
          </button>
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          className="bg-white text-purple-700 font-bold text-2xl px-10 py-4 rounded-full
                     shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95
                     transition-all duration-200 ease-in-out cursor-pointer"
        >
          🎮 Start Game
        </button>
      </div>
    </div>
  )
}

export default StartPopup
