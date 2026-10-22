#!/usr/bin/env node
// Swap the active site theme.
//
// The active theme lives at the project root (where Next.js expects it).
// Inactive themes are parked, fully intact, in themes/<name>/.
//
//   npm run theme            → show active + available themes
//   npm run theme <name>     → park the active theme, activate <name>

import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const THEMES_DIR = path.join(ROOT, "themes")
const MARKER = path.join(ROOT, ".active-theme")

// Everything that belongs to a theme. Shared: public/, package.json, configs.
const THEME_ITEMS = ["app", "components", "lib", "CLAUDE.md"]

const active = fs.readFileSync(MARKER, "utf8").trim()
const available = fs
  .readdirSync(THEMES_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const target = process.argv[2]

if (!target) {
  console.log(`Active theme: ${active}`)
  console.log(`Parked themes: ${available.join(", ") || "(none)"}`)
  process.exit(0)
}

if (target === active) {
  console.log(`"${target}" is already active.`)
  process.exit(0)
}

if (!available.includes(target)) {
  console.error(`No theme "${target}" in themes/. Available: ${available.join(", ")}`)
  process.exit(1)
}

const parkDir = path.join(THEMES_DIR, active)
const targetDir = path.join(THEMES_DIR, target)

if (fs.existsSync(parkDir)) {
  console.error(`themes/${active}/ already exists — refusing to overwrite it.`)
  process.exit(1)
}

// Park the active theme
fs.mkdirSync(parkDir)
for (const item of THEME_ITEMS) {
  const from = path.join(ROOT, item)
  if (fs.existsSync(from)) fs.renameSync(from, path.join(parkDir, item))
}

// Activate the target theme
for (const item of THEME_ITEMS) {
  const from = path.join(targetDir, item)
  if (fs.existsSync(from)) fs.renameSync(from, path.join(ROOT, item))
}
fs.rmSync(targetDir, { recursive: true, force: true })

fs.writeFileSync(MARKER, `${target}\n`)
fs.rmSync(path.join(ROOT, ".next"), { recursive: true, force: true })

console.log(`Switched: ${active} → ${target}. Restart \`npm run dev\`.`)
