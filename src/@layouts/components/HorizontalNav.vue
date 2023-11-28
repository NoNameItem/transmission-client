<script lang="ts" setup>
import { useTorrentListStore } from '@/stores/torrentList'
import { TorrentStatus, getStatusName } from '@/interfaces/torrents'

const torrentListStore = useTorrentListStore()

const statuses = Object.values(TorrentStatus)
  .filter(v => typeof v === 'number')
  .map(v => ({ id: v, title: getStatusName(v as TorrentStatus) }))

const sortFields = [
  { key: 'name', label: 'Name' },
  { key: 'etaNulled', label: 'Remaining time' },
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
        <VIcon
          icon="tabler-plus"
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
      >
        <VIcon
          icon="tabler-trash"
          size="50"
        />
      </VBtn>
    </li>
    <li>
      <VBtn
        size="70"
        variant="outlined"
        color="success"
        :disabled="torrentListStore.selectedTorrents.length === 0"
        @click="torrentListStore.startSelected"
      >
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
    <li class="nav-link">
      <VSwitch
        v-model="torrentListStore.sortDescending"
        class="one-line"
        label="Reverse"
      />
    </li>
    <VSpacer />
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
