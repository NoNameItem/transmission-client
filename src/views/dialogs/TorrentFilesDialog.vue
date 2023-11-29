<script setup lang="ts">
import sortArray from 'sort-array'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { filesize } from 'filesize'
import { useTorrentListStore } from '@/stores/torrentList'
import type { ApiResponse } from '@/utils/api'

interface TorrentFile {
  bytesCompleted: number
  length: number
  name: string
}

interface TorrentFileStats {
  bytesCompleted: number
  priority: 0
  wanted: boolean
}

interface TorrentData {
  fileStats: TorrentFileStats[]
  files: TorrentFile[]
}

interface FileData {
  id: number
  bytesCompleted: number
  length: number
  name: string
  priority: 0
  wanted: boolean
}

const visible = ref(false)
const files: Ref<FileData[]> = ref([])
const torrentName = ref('')
const selected: Ref<string[]> = ref([])
const rawFiles: Ref<TorrentFile[]> = ref([])

const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Size', value: 'size' },
  { title: 'Progress', value: 'completed' },
]

const torrentListStore = useTorrentListStore()

const fetchData = async state => {
  if (state.selectedTorrents.length !== 1) {
    files.value = []
    torrentName.value = ''
    selected.value = []
    rawFiles.value = []

    return
  }

  torrentName.value = torrentListStore.torrents.filter(torrent => torrent.id === state.selectedTorrents[0])[0].name

  const response = await $api<ApiResponse<{ torrents: TorrentData[] }>>('/', {
    method: 'POST',
    body: {
      method: 'torrent-get',
      arguments: {
        fields: [
          'files',
          'fileStats',
        ],
        ids: torrentListStore.selectedTorrents,
      },
    },
  })

  rawFiles.value = response.arguments.torrents[0].files

  const fileData: FileData[] = []
  for (let i = 0; i < response.arguments.torrents[0].files.length; i++)
    fileData.push({ ...response.arguments.torrents[0].files[i], ...response.arguments.torrents[0].fileStats[i] })

  const fileDataSorted = sortArray(
    fileData.map(file => ({
      ...file,
      size: filesize(file.length),
      completed: `${((file.bytesCompleted / file.length) * 100).toFixed(2)}%`,
      id: file.name,
    })),
    { by: 'name', order: 'asc' })

  files.value = fileDataSorted
  selected.value = fileData.filter(file => file.wanted).map(file => file.name)
}

torrentListStore.$subscribe(async (mutation, state) => {
  await fetchData(state)
})

watch(visible, newValue => {
  if (newValue)
    fetchData(torrentListStore)
})

const setFiles = async () => {
  const filesWanted: number[] = []
  const filesUnwanted: number[] = []

  rawFiles.value.forEach((file, index) => {
    if (selected.value.includes(file.name))
      filesWanted.push(index)
    else
      filesUnwanted.push(index)
  })

  await $api(
    '/',
    {
      method: 'POST',
      body: {
        method: 'torrent-set',
        arguments: {
          'files-wanted': filesWanted,
          'files-unwanted': filesUnwanted,
          'ids': torrentListStore.selectedTorrents,
        },
      },
    },
  )
  visible.value = false
}
</script>

<template>
  <VDialog
    v-model="visible"
    activator="parent"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
  >
    <VCard>
      <div>
        <VToolbar color="primary">
          <VBtn
            icon
            variant="plain"
            @click="visible = false"
          >
            <VIcon
              color="white"
              icon="tabler-x"
            />
          </VBtn>
          <VCardText>
            <VToolbarTitle>{{ torrentName }}</VToolbarTitle>
          </VCardText>
          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              @click="setFiles"
            >
              Save
            </VBtn>
          </VToolbarItems>
        </VToolbar>
      </div>
      <VDataTable
        v-model="selected"
        :items="files"
        :headers="headers"
        items-per-page="-1"
        fixed-header
        hover
        height="calc(100vh - 130px)"
        show-select
      />
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.table-wrap {
  height: 100vh;
}
</style>
