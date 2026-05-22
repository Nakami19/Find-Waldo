import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * useTimer — Custom hook that manages an elapsed-seconds stopwatch.
 *
 * @returns {{ elapsed: number, startTimer: () => void, stopTimer: () => void }}
 */
export function useTimer() {
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    const start = Date.now()
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 100)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [startTimer, stopTimer])

  return { elapsed, startTimer, stopTimer }
}
