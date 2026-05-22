/**
 * Header — Renders the main title and subtitle for the game page.
 */
function Header() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">
        🌴 Where&apos;s Waldo? 🌴
      </h1>
      <p className="text-white text-lg mb-6 opacity-90">
        Find Waldo in the beach crowd!
      </p>
    </>
  )
}

export default Header
