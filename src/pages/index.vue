<script setup lang="ts">
import { useTorrentListStore } from '@/stores/torrentList'
import { useSettingsStore } from '@/stores/settings'

const torrentListStore = useTorrentListStore()
const settingsStore = useSettingsStore()

await torrentListStore.fetchTorrentList()
await settingsStore.fetchSettings(true)
</script>

<template>
  <div>
    <VList
      v-if="torrentListStore.torrents.length > 0"
      lines="two"
    >
      <template
        v-for="(torrent, index) of torrentListStore.torrents"
        :key="torrent.id"
      >
        <TorrentListItem :torrent="torrent" />

        <VDivider v-if="index !== torrentListStore.torrents.length - 1" />
      </template>
    </VList>
  </div>
</template>
