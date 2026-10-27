// Lists `useTranslations('<namespace>')` namespaces used in src/ that aren't covered by
// src/i18n/client-namespaces.json (and so would be missing on the client).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const listed = JSON.parse(readFileSync('src/i18n/client-namespaces.json', 'utf8')).namespaces

const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (/\.tsx?$/.test(path)) files.push(path)
  }
}
walk('src')

const used = new Set()
for (const file of files) {
  const source = readFileSync(file, 'utf8')
  for (const m of source.matchAll(/useTranslations\(\s*['"]([^'"]+)['"]\s*\)/g)) used.add(m[1])
  if (/useTranslations\(\s*\)/.test(source)) console.warn(`warning: ${file} calls useTranslations() without a namespace`)
}

// covered = listed itself, under a listed namespace, or (partially, e.g. Works.*) above one
const covered = (ns) =>
  listed.some((l) => l === ns || ns.startsWith(`${l}.`) || l.startsWith(`${ns}.`))

const missing = [...used].filter((ns) => !covered(ns)).sort()
if (missing.length) {
  console.error('Missing from src/i18n/client-namespaces.json:\n  ' + missing.join('\n  '))
  process.exit(1)
}
console.log(`ok: ${used.size} namespaces covered`)
