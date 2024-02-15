<script lang="ts" setup>
import { useSessionStore } from '@/stores/session'
import { useTorrentListStore } from '@/stores/torrentList'

const sessionStats = useSessionStore()
const torrentListStore = useTorrentListStore()

// sessionStats.fetchSessionStats()
</script>

<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->

    <div>
      <span
        v-if="sessionStats.loaded"
        class=" d-inline-block mr-1"
      ><VIcon icon="tabler-arrow-narrow-down" /> {{ torrentListStore.downloadCount }} ({{ torrentListStore.activeDownloadCount }}) : {{
        sessionStats.downloadSpeed
      }}</span>
      <span
        v-if="sessionStats.loaded"
        class="d-inline-block mr-2"
      ><VIcon icon="tabler-arrow-narrow-up" /> {{ torrentListStore.uploadCount }} ({{ torrentListStore.activeUploadCount }}) : {{ sessionStats.uploadSpeed }}</span>
      <span
        v-if="sessionStats.loaded"
        class="d-none d-md-inline-block mr-1"
      >Active {{ sessionStats.activeTorrents }} of {{ sessionStats.allTorrents }} torrents</span>
      <span
        v-if="torrentListStore.errorCount > 0"
        class="d-none d-md-inline-block mr-1"
      >Errored {{ torrentListStore.errorCount }} torrent{{ torrentListStore.errorCount > 1 ? 's' : '' }}</span>
    </div>
    <!-- 👉 Footer: right content -->
    <div>
      <span
        v-if="sessionStats.loaded"
        class=" d-none d-sm-inline-block mr-1"
      ><VIcon icon="tabler-arrow-narrow-down" /> {{ sessionStats.downloaded }}</span>
      <span
        v-if="sessionStats.loaded"
        class="d-none d-sm-inline-block mr-2"
      ><VIcon icon="tabler-arrow-narrow-up" /> {{ sessionStats.uploaded }}</span>
      <span
        v-if="sessionStats.loaded"
        class="d-none d-md-inline-block mr-1"
      >Total ratio: {{ sessionStats.ratio }}</span>
      <IconBtn
        color="rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))"
        @click="torrentListStore.toggleMenu"
      >
        <VIcon
          icon="tabler-menu-2"
          size="26"
        />
      </IconBtn>
    </div>
  </div>
</template>
