/**
 * PlayAgainButton — Reset button that restarts the game.
 *
 * @param {{ onReset: () => void }} props
 */
function PlayAgainButton({ onReset }) {
  return (
    <button
      onClick={onReset}
      className="mb-4 bg-white text-purple-700 font-bold text-lg px-6 py-2 rounded-full
                 shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95
                 transition-all duration-200 ease-in-out cursor-pointer"
    >
      🔄 Play Again
    </button>
  )
}

export default PlayAgainButton
