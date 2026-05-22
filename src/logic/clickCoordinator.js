const BOX_SIZE = 50

function toNatural(value, displaySize, naturalSize) {
  return Math.round((value / displaySize) * naturalSize)
}

export function getClickCoordinates(event, imageElement) {
  const rect = imageElement.getBoundingClientRect()
  const x = Math.round(event.clientX - rect.left)
  const y = Math.round(event.clientY - rect.top)

  const naturalWidth = imageElement.naturalWidth
  const naturalHeight = imageElement.naturalHeight
  const dW = rect.width
  const dH = rect.height

  return {
    display: { x, y },
    natural: { x: toNatural(x, dW, naturalWidth), y: toNatural(y, dH, naturalHeight) },
    percent: {
      x: ((x / dW) * 100).toFixed(2),
      y: ((y / dH) * 100).toFixed(2),
    },
    box: {
      display: {
        x: x - BOX_SIZE / 2,
        y: y - BOX_SIZE / 2,
        width: BOX_SIZE,
        height: BOX_SIZE,
      },
      natural: {
        x: toNatural(x - BOX_SIZE / 2, dW, naturalWidth),
        y: toNatural(y - BOX_SIZE / 2, dH, naturalHeight),
        width: toNatural(BOX_SIZE, dW, naturalWidth),
        height: toNatural(BOX_SIZE, dH, naturalHeight),
      },
    },
  }
}
