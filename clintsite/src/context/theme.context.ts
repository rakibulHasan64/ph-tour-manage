import { createContext } from "react"
import type { Theme } from "../providers/Theme.provider"

type ThemeProviderState = {
   theme: Theme
   setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
   theme: "system",
   setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
