import { defineConfig } from 'vitest/config'

const testTimeoutInMilisseconds = 10000

export default defineConfig({
  test: {
   dir: './tests',
   testTimeout: testTimeoutInMilisseconds,
   watch: false,
  },
})