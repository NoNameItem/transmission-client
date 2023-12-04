<script setup lang="ts">
import { useTheme } from 'vuetify'
import themes from 'devextreme/ui/themes'
import type { ThemeSwitcherTheme } from '@layouts/types'

const appThemes: ThemeSwitcherTheme[] = [
  {
    name: 'system',
    icon: 'tabler-device-laptop',
  },
  {
    name: 'light',
    icon: 'tabler-sun-high',
  },
  {
    name: 'dark',
    icon: 'tabler-moon',
  },
]

const theme = useTheme()

const setDevExtremeTheme = appTheme => {
  if (appTheme.dark)
    themes.current('material.blue.dark')
  else
    themes.current('material.blue.light')
}

watch(theme.current, newVal => {
  setDevExtremeTheme(newVal)
})

setDevExtremeTheme(theme.current.value)
</script>

<template>
  <ThemeSwitcher :themes="appThemes" />
</template>
