<script setup lang="ts">
import { DxAutocomplete } from 'devextreme-vue/autocomplete'
import { useSettingsStore } from '@/stores/settings'
import type { ApiResponse } from '@/utils/api'
import { useFoldersStore } from '@/stores/folders'

const $api = useApi(true)

const settingsStore = useSettingsStore()
const foldersStore = useFoldersStore()

await settingsStore.fetchSettings(false)

const visible = ref(false)

const file = ref() as Ref<File>
const { base64: fileBase64 } = useBase64(file)
const folder = ref(settingsStore.downloadDir ?? '')
const start = ref(true)

const onFileInput = (files: File[]) => {
  file.value = files![0]
}

const addTorrent = async () => {
  foldersStore.addFolder(folder.value)

  const response = $api<ApiResponse<any>>('/',
    {
      method: 'POST',
      body: {
        method: 'torrent-add',
        arguments: {
          'download-dir': folder.value,
          'metainfo': fileBase64.value.replace('data:application/x-bittorrent;base64,', ''),
          'paused': !start.value,
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
    width="500"
  >
    <VCard class="dialog-card">
      <VCardText>
        <div class="dx-viewport">
          <VRow>
            <VCol cols="12">
              <VFileInput
                label="Torrent file"
                @update:modelValue="onFileInput"
              />
            </VCol>
            <VCol cols="12">
              <DxAutocomplete
                v-model:value="folder"
                :data-source="foldersStore.folders"
                :show-clear-button="true"
                :defer-rendering="false"
                placeholder="Download to"
                :drop-down-options="{ container: '.dx-viewport' }"
              />
            </VCol>
            <VCol cols="12">
              <VSwitch
                v-model="start"
                label="Start when added"
              />
            </VCol>
          </VRow>
        </div>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="secondary"
          @click="visible = false"
        >
          Close Dialog
        </VBtn>
        <VBtn
          color="success"
          @click="addTorrent"
        >
          Add torrent
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.dialog-card {
  overflow: visible!important;
}
</style>
