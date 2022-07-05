import {
  Text,
  Button,
  Container,
  render,
  VerticalSpace, RadioButtonsOption, RadioButtons
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import styles from './styles.css'
import { ApplyModeHandler, ApplyThemeHandler } from './types'

function Plugin() {
  const [mode, setMode] = useState('Light')
  const [theme, setTheme] = useState('Grape')

  const handleApplyModeButtonClick = useCallback(function () {
    emit<ApplyModeHandler>('APPLY_MODE', mode)
  },[mode])

  const handleApplyThemeButtonClick = useCallback(function () {
    emit<ApplyThemeHandler>('APPLY_THEME', theme)
  },[theme])

  return (
    <Container space="medium">
      <div class={styles.container}>
        <VerticalSpace space="small" />

        {/* @ts-ignore */}
        <ModeRadios setValue={(value) => setMode(value)} />
        <VerticalSpace space="small" />
        <Button fullWidth onClick={handleApplyModeButtonClick}>
          Apply mode
        </Button>

        <VerticalSpace space="small" />
        <VerticalSpace space="small" />

        {/* @ts-ignore */}
        <ThemeRadios setValue={(value) => setTheme(value)} />
        <VerticalSpace space="small" />
        <Button fullWidth onClick={handleApplyThemeButtonClick}>
          Apply theme
        </Button>
      </div>

    </Container>
  )
}

// @ts-ignore
export const ModeRadios = function (props) {
  const [value, setValue] = useState<null | string>(null)
  const options: Array<RadioButtonsOption> = [
    { children: <Text>Light</Text>, value: 'Light' },
    { children: <Text>Dark</Text>, value: 'Dark' },
  ]
  // @ts-ignore
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    // console.log(newValue)
    setValue(newValue)
    props.setValue(newValue)
  }
  return (
    <RadioButtons onChange={handleChange} options={options} value={value} />
  )
}

// @ts-ignore
export const ThemeRadios = function (props) {
  const [value, setValue] = useState<null | string>(null)
  const options: Array<RadioButtonsOption> = [
    { children: <Text>Grape</Text>, value: 'Grape' },
    { children: <Text>Lime</Text>, value: 'Lime' },
    { children: <Text>Sunset</Text>, value: 'Sunset' },
  ]
  // @ts-ignore
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    // console.log(newValue)
    setValue(newValue)
    props.setValue(newValue)
  }
  return (
    <RadioButtons onChange={handleChange} options={options} value={value} />
  )
}

export default render(Plugin)
