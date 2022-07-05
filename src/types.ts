import { EventHandler } from '@create-figma-plugin/utilities'

export interface ApplyModeHandler extends EventHandler {
  name: 'APPLY_MODE'
  handler: (mode: string) => void
}

export interface ApplyThemeHandler extends EventHandler {
  name: 'APPLY_THEME'
  handler: (theme: string) => void
}
