import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractIdFromUrl(url: string): string {
  if (!url) return ''
  const matches = url.match(/\/([0-9]+)\/?$/)
  return matches ? matches[1] : ''
}
