// Converts the high-resolution masters/NNN.jpg into game-ready src/assets/cards/NNN.webp:
// 250 x 324 WebP with the same rounded transparent corners as the original cards.
// Usage: cd design/cards && npm install && npm run build [-- NNN]
import sharp from 'sharp'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const here = path => fileURLToPath(new URL(path, import.meta.url))
const mastersDir = here('./masters/')
const cardsDir = here('../../src/assets/cards/')
const only = process.argv[2]
const WIDTH = 250
const HEIGHT = 324

// Reuse the corner shape of an original card as the alpha mask.
const mask = await sharp(`${cardsDir}001.webp`).extractChannel('alpha').raw().toBuffer()

const masters = readdirSync(mastersDir).filter(f => /^\d{3}\.jpe?g$/.test(f) && (!only || f.startsWith(only)))

for (const file of masters) {
  const output = `${cardsDir}${file.slice(0, 3)}.webp`
  const rgb = await sharp(mastersDir + file)
    .resize(WIDTH, HEIGHT, { fit: 'fill', kernel: 'lanczos3' })
    .removeAlpha()
    .raw()
    .toBuffer()
  await sharp(rgb, { raw: { width: WIDTH, height: HEIGHT, channels: 3 } })
    .joinChannel(mask, { raw: { width: WIDTH, height: HEIGHT, channels: 1 } })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(output)
  console.log('built', file, '->', output)
}
