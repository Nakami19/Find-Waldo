import { forwardRef } from 'react'

/**
 * GameImage — Wraps the image in a relative container and renders
 * the clickable image, the Waldo highlight box, and the win overlay.
 *
 * The image source is passed as a prop so the parent can swap it
 * out based on the currently selected map level.
 *
 * @param {{ imageSrc: string, onImageClick: (event) => void, won: boolean, waldoBox: object | null }} props
 * @param {React.RefObject<HTMLImageElement>} ref — forwarded to the <img> element
 */
const GameImage = forwardRef(function GameImage({ imageSrc, onImageClick, won, waldoBox }, ref) {
  return (
    <div className="relative max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden border-4 border-white/40">

      {/* The clickable image — src is driven by the selected map */}
      <img
        ref={ref}
        src={imageSrc}
        alt="Where's Waldo scene"
        className="w-full h-auto cursor-crosshair select-none"
        onClick={onImageClick}
        draggable={false}
      />

      {/* Waldo highlight box — shown only on a correct guess */}
      {waldoBox && (
        <div
          className="absolute border-4 border-green-400 pointer-events-none animate-pulse rounded-sm shadow-[0_0_20px_rgba(74,222,128,0.7)]"
          style={{
            left:   waldoBox.x,
            top:    waldoBox.y,
            width:  waldoBox.width,
            height: waldoBox.height,
          }}
        />
      )}

      {/* Win overlay — fades the image and shows the victory message */}
      {won && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
          <span className="text-white text-3xl md:text-5xl font-black drop-shadow-2xl animate-bounce">
            🎉 YOU FOUND WALDO! 🎉
          </span>
        </div>
      )}
    </div>
  )
})

export default GameImage
