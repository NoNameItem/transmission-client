<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import type { ApiResponse } from '@/utils/api'

const settingsStore = useSettingsStore()

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
    <VCard>
      <VCardText>
        <VRow>
          <VCol cols="12">
            <VFileInput
              label="Torrent file"
              @update:modelValue="onFileInput"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="folder"
              label="Folder"
              variant="outlined"
            />
          </VCol>
          <VCol cols="12">
            <VSwitch
              v-model="start"
              label="Start when added"
            />
          </VCol>
        </VRow>
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
