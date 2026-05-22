/**
 * gameLogic.js — Handles coordinate validation for the "Where's Waldo?" game.
 *
 * coordinates.json stores an array of Waldo locations, one per map level.
 * Each entry contains a rectangle (top-left corner + dimensions) in natural
 * image pixels, plus a "level" key that matches the level identifiers in
 * maps.js.
 *
 * Every public function in this module accepts a `level` string so that
 * the correct coordinate set is used for the currently active map.
 */

import allCoords from '../data/coordinates.json'

/**
 * Looks up the coordinate entry for a given map level.
 *
 * @param {string} level — e.g. "beach", "factory", "skiing"
 * @returns {{ level: string, x: number, y: number, width: number, height: number }}
 */
function getCoords(level) {
  return allCoords.find((entry) => entry.level === level)
}

/**
 * Converts a natural-image value to its equivalent display pixel value
 * based on the image's current rendered size vs. its native resolution.
 *
 * @param {number} naturalValue
 * @param {number} naturalSize   — Image's native dimension (width or height)
 * @param {number} displaySize   — Image's currently rendered dimension
 * @returns {number}
 */
function toDisplay(naturalValue, naturalSize, displaySize) {
  return (naturalValue / naturalSize) * displaySize
}

/**
 * Checks whether the user's click (in natural image coordinates) falls
 * within Waldo's rectangular area for the given map level.
 *
 * @param {number} clickNaturalX
 * @param {number} clickNaturalY
 * @param {string} level          — Map level identifier
 * @returns {boolean}
 */
export function isHit(clickNaturalX, clickNaturalY, level) {
  const coords = getCoords(level)
  if (!coords) return false

  return (
    clickNaturalX >= coords.x &&
    clickNaturalX <= coords.x + coords.width &&
    clickNaturalY >= coords.y &&
    clickNaturalY <= coords.y + coords.height
  )
}

/**
 * Returns the display-coordinate bounding box for Waldo's location on the
 * given map level, dynamically computed from the image's current rendered size.
 *
 * @param {HTMLImageElement} imgEl
 * @param {string}           level  — Map level identifier
 * @returns {{ x: number, y: number, width: number, height: number }}
 */
export function getWaldoDisplayBox(imgEl, level) {
  const coords = getCoords(level)
  if (!coords) return { x: 0, y: 0, width: 0, height: 0 }

  const { naturalWidth, naturalHeight } = imgEl
  const rect = imgEl.getBoundingClientRect()
  const { width: displayWidth, height: displayHeight } = rect

  return {
    x:      toDisplay(coords.x,              naturalWidth,  displayWidth),
    y:      toDisplay(coords.y,              naturalHeight, displayHeight),
    width:  toDisplay(coords.width,          naturalWidth,  displayWidth),
    height: toDisplay(coords.height,         naturalHeight, displayHeight),
  }
}
