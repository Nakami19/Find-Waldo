/**
 * maps.js — Configuration for every available game map.
 *
 * Each map entry links a level identifier (matching the "level" field in
 * coordinates.json) to its display label and the imported image asset.
 * Vite resolves image imports at build time, producing content-hashed URLs.
 */

import beachImage from '../assets/Wheres-Waldo-Beach.jpg'
import factoryImage from '../assets/Wheres-Waldo-Candy-Factory.jpg'
import skiingImage from '../assets/Wheres-Waldo-Skiing.jpg'

/**
 * Array of available maps. The order here determines the order shown
 * in the carousel selector on the start popup.
 *
 * @type {{ level: string, label: string, image: string }[]}
 */
export const MAPS = [
  { level: 'beach',   label: '🏖️ Beach',   image: beachImage },
  { level: 'factory', label: '🍬 Factory',  image: factoryImage },
  { level: 'skiing',  label: '⛷️ Skiing',   image: skiingImage },
]
