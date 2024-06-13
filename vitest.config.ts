import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const testTimeoutInMilisseconds = 10000

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
   dir: './tests',
   testTimeout: testTimeoutInMilisseconds,
   watch: false,
   alias: { '@/': new URL('./src/', import.meta.url).pathname,  }
  },
})