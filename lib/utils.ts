import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 合并 className
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
