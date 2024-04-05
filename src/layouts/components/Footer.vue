<script lang="ts" setup>
import { Duration } from 'luxon'
import { useSessionStore } from '@/stores/session'
import { useTorrentListStore } from '@/stores/torrentList'

const sessionStats = useSessionStore()
const torrentListStore = useTorrentListStore()

const sessionAge = computed(() => {
  if (sessionStats.loaded) {
    const age = Duration.fromObject({ seconds: sessionStats.secondsActive }, { locale: 'en-Us' })

    return age.rescale().toHuman({ unitDisplay: 'short' })
  }

  return 'N/A'
})

// sessionStats.fetchSessionStats()
</script>

<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->

    <div>
      <span
        v-if="sessionStats.loaded"
        class=" d-inline-block mr-1"
      ><VIcon icon="tabler-arrow-narrow-down" /> {{
        torrentListStore.downloadCount
      }} ({{ torrentListStore.activeDownloadCount }}) : {{
        sessionStats.downloadSpeed
      }}</span>
      <span
        v-if="sessionStats.loaded"
        class="d-inline-block mr-2"
      ><VIcon icon="tabler-arrow-narrow-up" /> {{ torrentListStore.uploadCount }} ({{
        torrentListStore.activeUploadCount
      }}) : {{ sessionStats.uploadSpeed }}</span>
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
      <div class="d-inline-block">
        <VTooltip
          activator="parent"
          location="top"
        >
          <span
            v-if="sessionStats.loaded"
            class=" d-none d-sm-inline-block mr-1"
          >Total: </span>
          <span
            v-if="sessionStats.loaded"
            class="d-inline-block mr-1"
          ><VIcon icon="tabler-arrow-narrow-down" /> {{ sessionStats.downloaded }}</span>
          <span
            v-if="sessionStats.loaded"
            class="d-inline-block mr-2"
          ><VIcon icon="tabler-arrow-narrow-up" /> {{ sessionStats.uploaded }}</span>
          <span
            v-if="sessionStats.loaded"
            class="d-inline-block mr-1"
          >Ratio: {{ sessionStats.ratio }}</span>
          <span
            v-if="sessionStats.loaded"
            class="d-block mr-1"
          >Current session age: {{ sessionAge }}</span>
        </VTooltip>
        <span
          v-if="sessionStats.loaded"
          class=" d-none d-sm-inline-block mr-1"
        >Session: </span>
        <span
          v-if="sessionStats.loaded"
          class=" d-none d-sm-inline-block mr-1"
        ><VIcon icon="tabler-arrow-narrow-down" /> {{ sessionStats.downloadedSession }}</span>
        <span
          v-if="sessionStats.loaded"
          class="d-none d-sm-inline-block mr-2"
        ><VIcon icon="tabler-arrow-narrow-up" /> {{ sessionStats.uploadedSession }}</span>
        <span
          v-if="sessionStats.loaded"
          class="d-none d-md-inline-block mr-1"
        >Ratio: {{ sessionStats.ratioSession }}</span>
      </div>
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
