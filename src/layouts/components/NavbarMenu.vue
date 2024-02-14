<script setup lang="ts">
import SetingsDialog from '@/views/dialogs/SetingsDialog.vue'
import { useTorrentListStore } from '@/stores/torrentList'
import FoldersDialog from '@/views/dialogs/FoldersDialog.vue'

const startAll = () => {
  $api('/', {
    method: 'POST',
    body: {
      method: 'torrent-start',
      arguments: {},
    },
  })
}

const stopAll = () => {
  $api('/', {
    method: 'POST',
    body: {
      method: 'torrent-stop',
      arguments: {},
    },
  })
}

const torrentListStore = useTorrentListStore()
const toggleViewLabel = computed(() => torrentListStore.compactView ? 'Full view' : 'Compact view')
const toggleViewIcon = computed(() => torrentListStore.compactView ? 'baseline-density-medium' : 'baseline-density-small')
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
          :prepend-icon="`tabler-${toggleViewIcon}`"
          @click="torrentListStore.toggleView"
        >
          {{ toggleViewLabel }}
        </VListItem>
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
        <VListItem
          prepend-icon="tabler-settings"
          @click.prevent
        >
          Preferences
          <Suspense>
            <SetingsDialog />
          </Suspense>
        </VListItem>
        <VListItem
          prepend-icon="tabler-folders"
          @click.prevent
        >
          Folders
          <Suspense>
            <FoldersDialog />
          </Suspense>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>

<style scoped lang="scss">

</style>
