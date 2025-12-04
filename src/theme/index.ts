
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#baddff" },
          200: { value: "#8dc9ff" },
          300: { value: "#5fb5ff" },
          400: { value: "#31a0ff" },
          500: { value: "#188bff" },
          600: { value: "#0076e6" },
          700: { value: "#0061b3" },
          800: { value: "#004c80" },
          900: { value: "#00374d" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
