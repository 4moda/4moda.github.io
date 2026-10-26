import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectDir = fileURLToPath(new URL('.', import.meta.url))

// On WSL, a checkout under /mnt/<drive> lives on the Windows filesystem, where
// inotify never fires — the dev server would serve stale modules forever.
// Polling is slower but it is the only thing that works there.
const needsPolling = process.platform === 'linux' && projectDir.startsWith('/mnt/')

// 4moda.github.io is a GitHub *user* site, so it is served from the domain
// root and `base` stays '/'. A project site would need base: '/<repo>/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    watch: needsPolling ? { usePolling: true, interval: 400 } : undefined,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
