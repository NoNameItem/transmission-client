<script lang="ts" setup>
import { useTorrentListStore } from '@/stores/torrentList'
import { TorrentStatus, getStatusName } from '@/interfaces/torrents'
import AddTorrentDialog from '@/views/dialogs/AddTorrentDialog.vue'
import TorrentFilesDialog from '@/views/dialogs/TorrentFilesDialog.vue'
import { useSessionStore } from '@/stores/session'

const torrentListStore = useTorrentListStore()
const statsStore = useSessionStore()

const statuses = Object.values(TorrentStatus)
  .filter(v => typeof v === 'number')
  .map(v => ({ id: v, title: getStatusName(v as TorrentStatus) }))

const sortFields = [
  { key: 'name', label: 'Name' },
  { key: 'etaNulled', label: 'Remaining time' },
  { key: 'lastActive', label: 'Last active' },
  { key: 'queuePosition', label: 'Queue position' },
  { key: 'rateDownload', label: 'Download speed' },
  { key: 'rateUpload', label: 'Upload speed' },
  { key: 'uploadRatio', label: 'Ratio' },
  { key: 'status', label: 'Status' },
]
</script>

<template>
  <ul class="nav-items">
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="secondary"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Add torrent
        </VTooltip>
        <VIcon
          icon="tabler-plus"
          size="50"
        />
        <Suspense>
          <AddTorrentDialog />
        </Suspense>
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="error"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.deleteSelection(false)"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Remove selected
        </VTooltip>
        <VIcon
          icon="tabler-trash"
          size="50"
        />
      </VBtn>
    </li>
    <VDivider
      vertical
      class="mr-1 ml-1"
    />
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="success"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.startSelected"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Start selected
        </VTooltip>
        <VIcon
          icon="tabler-play"
          size="50"
        />
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="secondary"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.stopSelected"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Stop selected
        </VTooltip>
        <VIcon
          icon="tabler-pause"
          size="50"
        />
      </VBtn>
    </li>
    <VDivider
      vertical
      class="mr-1 ml-1"
    />
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="primary"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.queueMoveTopSelected"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Move to top
        </VTooltip>
        <VIcon
          icon="tabler-chevrons-up"
          size="50"
        />
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="primary"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.queueMoveUpSelected"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Move up
        </VTooltip>
        <VIcon
          icon="tabler-chevron-up"
          size="50"
        />
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="primary"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.queueMoveDownSelected"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Move down
        </VTooltip>
        <VIcon
          icon="tabler-chevron-down"
          size="50"
        />
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="primary"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.queueMoveBottomSelected"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Move to bottom
        </VTooltip>
        <VIcon
          icon="tabler-chevrons-down"
          size="50"
        />
      </VBtn>
    </li>
    <VDivider
      vertical
      class="mr-1 ml-1"
    />
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="info"
        :disabled="torrentListStore.selectedTorrents.length !== 1"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Torrent files
        </VTooltip>
        <VIcon
          icon="tabler-folder-search"
          size="50"
        />
        <Suspense>
          <TorrentFilesDialog />
        </Suspense>
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="warning"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.verifySelected"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Verify data
        </VTooltip>
        <VIcon
          icon="tabler-folder-check"
          size="50"
        />
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="error"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.deleteSelection(true)"
      >
        <VTooltip
          activator="parent"
          location="bottom"
        >
          Remove selected with data
        </VTooltip>
        <VIcon
          icon="tabler-folder-x"
          size="50"
        />
      </VBtn>
    </li>
    <VDivider
      v-if="torrentListStore.selectedTorrents.length !== 0"
      vertical
      class="mr-1 ml-1"
    />
    <li>
      <VBtn
        v-if="torrentListStore.selectedTorrents.length !== 0"
        size="70"
        variant="outlined"
        color="secondary"
        @click="torrentListStore.clearSelection"
      >
        <VIcon
          icon="tabler-x"
          size="50"
        />
      </VBtn>
    </li>
  </ul>
  <ul class="nav-items mt-2">
    <li class="nav-link">
      <AppSelect
        v-model="torrentListStore.statusesForFilter"
        :items="statuses"
        :menu-props="{ maxHeight: '400' }"
        item-title="title"
        item-value="id"
        label="Show"
        multiple
        placeholder="All"
      />
    </li>
    <li class="nav-link">
      <AppTextField
        v-model="torrentListStore.filterString"
        label="Filter"
        clearable
      />
    </li>
    <li class="nav-link">
      <AppSelect
        v-model="torrentListStore.sortByField"
        :items="sortFields"
        :menu-props="{ maxHeight: '400' }"
        item-title="label"
        item-value="key"
        label="Sort by"
      />
    </li>
    <li class="mr-1">
      <VSwitch
        v-model="torrentListStore.sortDescending"
        class="one-line"
        label="Reverse"
      />
    </li>
  </ul>
  <div
    v-if="statsStore.allTorrents && torrentListStore.torrents.length !== statsStore.allTorrents"
    class="mt-2"
  >
    Showing {{ torrentListStore.torrents.length }} torrents of {{ statsStore.allTorrents }}
    <a
      href="#"
      class="text-primary"
      @click="torrentListStore.resetFilters"
    >
      Reset filters
    </a>
  </div>
</template>

<style lang="scss">
.layout-wrapper.layout-nav-type-horizontal {
  .nav-items {
    display: flex;
    flex-wrap: wrap;
  }
}

.nav-link {
  margin-right: 10px;
  min-width: 150px;
}

.one-line {
  margin-top: 35px;
}
</style>
