<script setup lang="ts">
const startAll = () => {
  $api('/', {
    method: 'POST',
    body: {
      method: 'torrent-start',
      arguments: {
      },
    },
  })
}

const stopAll = () => {
  $api('/', {
    method: 'POST',
    body: {
      method: 'torrent-stop',
      arguments: {
      },
    },
  })
}
</script>

<template>
  <IconBtn color="rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))">
    <VIcon
      icon="tabler-menu-2"
      size="26"
    />
    <VMenu
      activator="parent"
      offset="14px"
    >
      <VList>
        <VListItem
          prepend-icon="tabler-play"
          @click="startAll"
        >
          Start all
        </VListItem>
        <VListItem
          prepend-icon="tabler-pause"
          @click="stopAll"
        >
          Stop all
        </VListItem>
        <VListItem prepend-icon="tabler-settings">
          Preferences
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>

<style scoped lang="scss">

</style>
