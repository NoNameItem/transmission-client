<script setup lang="ts">
import { DxColumn, DxScrolling, DxSelection, DxSorting, DxTreeList } from 'devextreme-vue/tree-list'

import { useTorrentListStore } from '@/stores/torrentList'
import type { ApiResponse } from '@/utils/api'
import { FileTree } from '@/utils/fileTree'

const $api = useApi(true)

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
  id: string
  bytesCompleted: number
  length: number
  name: string
  priority: 0
  wanted: boolean
}

const visible = ref(false)
const files: Ref<FileTree> = ref(new FileTree())
const torrentName = ref('')
const selected: Ref<string[]> = ref([])
const rawFiles: Ref<TorrentFile[]> = ref([])

const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Size', value: 'size' },
  { title: 'Progress', value: 'completed' },
  { title: 'Type', value: 'type' },
]

const torrentListStore = useTorrentListStore()

const fetchData = async state => {
  if (state.selectedTorrents.length !== 1) {
    files.value = new FileTree()
    torrentName.value = ''
    selected.value = []
    rawFiles.value = []

    return
  }

  torrentName.value = torrentListStore.torrents.filter(torrent => torrent.id === state.selectedTorrents[0])[0].name
  files.value = new FileTree()
  selected.value = []

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

  for (let i = 0; i < response.arguments.torrents[0].files.length; i++) {
    files.value.addFile(response.arguments.torrents[0].files[i].name, response.arguments.torrents[0].files[i].length, response.arguments.torrents[0].files[i].bytesCompleted)
    if (response.arguments.torrents[0].fileStats[i].wanted)
      selected.value.push(response.arguments.torrents[0].files[i].name)
  }
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

      <VCardText>
        <div class="dx-viewport">
          <DxTreeList
            v-if="files?.roots.length > 0"
            id="filesTreee"
            v-model:selected-row-keys="selected"
            :data-source="files.roots"
            :auto-expand-all="true"
            :hover-state-enabled="true"
            :word-wrap-enabled="true"
            items-expr="children"
            data-structure="tree"
            key-expr="path"
          >
            <DxSorting mode="multiple" />
            <DxScrolling
              mode="virtual"
              :preload-enabled="true"
            />
            <DxSelection
              :recursive="true"
              mode="multiple"
            />
            <DxColumn
              data-field="name"
              :sort-index="2"
              sort-order="asc"
            />
            <DxColumn
              data-field="type"
              :sort-index="1"
              sort-order="asc"
              :width="100"
            />
            <DxColumn
              data-field="completed"
              :width="120"
            />
            <DxColumn
              data-field="size"
              :width="100"
            />
            <!-- Configuration goes here -->
          </DxTreeList>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.table-wrap {
  height: 100vh;
}
</style>
