/**
 * Game.jsx — Root game orchestrator.
 *
 * Responsibilities:
 *  - Manage top-level state (won, waldoBox, mistakes, started, selectedLevel)
 *  - Decide whether to show the start popup or the game UI
 *  - Wire up the click handler that validates guesses and plays sounds
 *  - Provide the reset handler that returns to the map-selection popup
 *
 * All sub-components follow the Single Responsibility Principle.
 */

import { useState, useRef, useCallback } from 'react'

// --- Logic & data ---
import { getClickCoordinates } from '../logic/clickCoordinator'
import { isHit, getWaldoDisplayBox } from '../logic/gameLogic'
import { playErrorSound, playVictorySound } from '../logic/sounds'
import { useTimer } from '../hooks/useTimer'
import { MAPS } from '../data/maps'

// --- UI components ---
import Header from './Header'
import StatsBar from './StatsBar'
import PlayAgainButton from './PlayAgainButton'
import GameImage from './GameImage'
import StartPopup from './StartPopup'

function Game() {
  // ── Game state ──
  const [won, setWon] = useState(false)
  const [waldoBox, setWaldoBox] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [started, setStarted] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(null)

  // ── Refs ──
  const imgRef = useRef(null)
  const soundPlayedRef = useRef(false)

  // ── Timer ──
  const { elapsed, startTimer, stopTimer } = useTimer()

  // ── Derived data ──
  const currentMap = MAPS.find((m) => m.level === selectedLevel)

  // ── Click handler ──
  const handleImageClick = useCallback((event) => {
    if (won) return

    const imgEl = imgRef.current
    if (!imgEl || !selectedLevel) return

    const coords = getClickCoordinates(event, imgEl)
    console.log('Click coordinates:', coords)

    if (isHit(coords.natural.x, coords.natural.y, selectedLevel)) {
      stopTimer()
      setWaldoBox(getWaldoDisplayBox(imgEl, selectedLevel))
      setWon(true)
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true
        playVictorySound()
      }
    } else {
      setMistakes((prev) => prev + 1)
      playErrorSound()
    }
  }, [won, selectedLevel, stopTimer])

  // ── Start handler (called from the popup) ──
  const handleStart = useCallback((level) => {
    setSelectedLevel(level)
    setStarted(true)
    startTimer()
  }, [startTimer])

  // ── Reset handler (called from "Play Again") ──
  const handleReset = useCallback(() => {
    // Stop the timer first
    stopTimer()

    // Reset all game state
    setWon(false)
    setWaldoBox(null)
    setMistakes(0)
    soundPlayedRef.current = false

    // Return to the popup so the user can choose a map again
    setStarted(false)
  }, [stopTimer])

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 flex flex-col items-center justify-center p-4">

      {started && currentMap ? (
        <>
          <Header />
          <StatsBar elapsed={elapsed} mistakes={mistakes} />
          <PlayAgainButton onReset={handleReset} />
          <GameImage
            ref={imgRef}
            imageSrc={currentMap.image}
            onImageClick={handleImageClick}
            won={won}
            waldoBox={waldoBox}
          />
        </>
      ) : (
        <StartPopup onStart={handleStart} />
      )}
    </div>
  )
}

export default Game
