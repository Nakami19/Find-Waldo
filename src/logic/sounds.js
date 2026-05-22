/**
 * sounds.js — Plays error and victory sounds using the Web Audio API.
 *
 * Both sounds are synthesised programmatically, so no external audio files
 * or network requests are needed. The Web Audio API is initialised lazily on
 * the first user interaction (required by browser autoplay policies).
 */

/** Singleton AudioContext — created on first sound play */
let audioCtx = null

/**
 * Returns the shared AudioContext, creating it if it doesn't exist yet.
 * Browsers require AudioContexts to be created/resumed after a user gesture.
 *
 * @returns {AudioContext}
 */
function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Resume if suspended (e.g. by autoplay policy — should already be active
  // since we only play sounds in response to user clicks)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/**
 * Plays a short, low-pitched buzzing sound to indicate an incorrect guess.
 * Uses a square-wave oscillator at 150 Hz with a fast decay envelope.
 */
export function playErrorSound() {
  const ctx = getContext()

  // Create an oscillator node and a gain node for volume control
  const oscillator = ctx.createOscillator()
  const gainNode   = ctx.createGain()

  // Wire them together: oscillator → gain → speakers
  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  // Configure the oscillator: square wave at a low frequency (buzzer-like)
  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(150, ctx.currentTime)

  // Configure the volume envelope: start loud, fade out quickly
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)

  // Schedule the sound
  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.35)
}

/**
 * Plays a cheerful ascending arpeggio to celebrate a correct guess.
 * Four sine-wave notes (C5 → E5 → G5 → C6) play in quick succession.
 */
export function playVictorySound() {
  const ctx = getContext()

  // Define the notes of the arpeggio: frequencies in Hz
  const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
  const noteDuration = 0.25 // seconds each note plays
  const gap = 0.15         // seconds between note starts

  notes.forEach((freq, index) => {
    const startTime = ctx.currentTime + index * gap

    // Create and wire an oscillator + gain pair for this note
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    // Pure sine wave for a pleasant, bell-like tone
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, startTime)

    // Volume envelope: fade in slightly, hold, then decay
    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration)

    // Schedule this note
    osc.start(startTime)
    osc.stop(startTime + noteDuration)
  })
}
