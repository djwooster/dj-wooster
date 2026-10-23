import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom type scale so `text-14` doesn't get merged away as a color
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["12", "14", "16", "20", "28", "40", "64", "96"] }],
      rounded: [{ rounded: ["inner", "card", "panel"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
