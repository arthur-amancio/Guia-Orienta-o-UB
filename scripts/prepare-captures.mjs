// Only crops real browser captures. Never synthesizes or replaces interface pixels.
// Raw captures stay outside the repository. Account header is excluded in every crop.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const source = process.argv[2];
if (!source) throw new Error('Pass the local directory containing reviewed portal-*.png captures.');
await mkdir('public/portal', { recursive: true });
const crops = [
  ['home', 'inicio', 110, 550, 1300, 350],
  ['problema', 'campos', 280, 115, 980, 515],
  ['problema', 'descricao-anexos', 280, 625, 980, 565],
  ['categoria', 'categoria', 280, 275, 980, 430],
  ['urgencia', 'urgencia', 280, 170, 980, 450],
  ['chamados', 'chamados', 115, 95, 1300, 420],
  ['faq', 'faq', 115, 95, 1300, 240],
];
for (const [input, output, left, top, width, height] of crops) {
  await sharp(`${source}/portal-${input}.png`).extract({ left, top, width, height })
    .png().toFile(`public/portal/${output}.png`);
}

// Derive the focused step-2 view only from the already-sanitized campos crop.
await sharp('public/portal/campos.png')
  .extract({ left: 8, top: 248, width: 500, height: 267 })
  .png()
  .toFile('public/portal/campos-principais.png');
