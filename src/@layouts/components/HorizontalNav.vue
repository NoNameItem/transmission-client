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
