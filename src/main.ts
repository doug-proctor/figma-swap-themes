import { loadFontsAsync, on, showUI } from '@create-figma-plugin/utilities'

import { ApplyModeHandler, ApplyThemeHandler } from './types'

export default function () {
  on<ApplyModeHandler>('APPLY_MODE', async function (mode: string) {
    console.log('APPLY_MODE', mode)
    for (const node of figma.currentPage.selection) {
      traverseMode(node, mode)
    }
  })
  on<ApplyThemeHandler>('APPLY_THEME', async function (theme: string) {
    console.log('APPLY_THEME', theme)
    for (const node of figma.currentPage.selection) {
      traverseTheme(node, theme)
    }
  })
  showUI({ width: 320, height: 240 })
}

function traverseMode(node: SceneNode, mode: String) {
  // Is there a fill colour style?
  if ("fillStyleId" in node) {
    // Get the style ID
    const id = node.fillStyleId
    if (id) {
      // Get the name of the fill style
      const styleName = figma.getStyleById(id as string)?.name.split('/')
      if (styleName) {
        // Get the current mode
        // const currentMode = styleName[2]
        // const targetMode = currentMode === "Light" ? "Dark" : "Light"
        // Get name of target fill style
        const targetName = `${styleName[0]}/${styleName[1]}/${mode}/${styleName[3]}`
        // Find the style by that name:
        const targetStyle = figma.getLocalPaintStyles().find(style => style.name === targetName)

        if (targetStyle) {
          node.fillStyleId = targetStyle.id
        }
      }
    }
  }
  // Recurse:
  if ("children" in node) {
    for (const child of node.children) {
      traverseMode(child, mode)
    }
  }
}

function traverseTheme(node: SceneNode, theme: String) {
  // Is there a fill colour style?
  if ("fillStyleId" in node) {
    // Get the style ID
    const id = node.fillStyleId
    if (id) {
      // Get the name of the fill style
      const styleName = figma.getStyleById(id as string)?.name.split('/')
      if (styleName) {
        // Get the current theme
        // const currentTheme = styleName[1]
        // const targetTheme = currentTheme === "Grape" ? "Lime" : "Grape"
        // Get name of target fill style
        const targetName = `${styleName[0]}/${theme}/${styleName[2]}/${styleName[3]}`
        // Find the style by that name:
        const targetStyle = figma.getLocalPaintStyles().find(style => style.name === targetName)

        if (targetStyle) {
          node.fillStyleId = targetStyle.id
        }
      }
    }
  }
  // Recurse:
  if ("children" in node) {
    for (const child of node.children) {
      traverseTheme(child, theme)
    }
  }
}
