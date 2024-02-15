<script setup lang="ts">
import { useTorrentListStore } from '@/stores/torrentList'
import { useConnectionStore } from '@/stores/connection'

const torrentListStore = useTorrentListStore()
const connectionStore = useConnectionStore()

connectionStore.startFetch()

// await torrentListStore.fetchTorrentList()
// await settingsStore.fetchSettings(true)

const login = ref('')
const password = ref('')
const baseUrl = ref('')
const savingConnection = ref(false)
const validConnection = ref(true)

const setConnection = async () => {
  savingConnection.value = true
  validConnection.value = await connectionStore.setupConnection(baseUrl.value, login.value, password.value)
  savingConnection.value = false
}
</script>

<template>
  <div>
    <VList
      v-if="connectionStore.connectionSet && torrentListStore.torrents.length > 0"
      lines="two"
    >
      <template
        v-for="(torrent, index) of torrentListStore.torrents"
        :key="torrent.id"
      >
        <TorrentListItem
          v-if="!torrentListStore.compactView || (torrentListStore.selectedTorrents.includes(torrent.id) && torrentListStore.selectedTorrents.length === 1)"
          :torrent="torrent"
        />
        <TorrentListCompactItem
          v-else
          :torrent="torrent"
        />

        <VDivider v-if="index !== torrentListStore.torrents.length - 1" />
      </template>
    </VList>
    <VCard v-else-if="!connectionStore.connectionSet">
      <VCardTitle>Connection Settings</VCardTitle>
      <VCardText v-if="!validConnection">
        <p>Could not connect to transmission. Please check settings</p>
      </VCardText>
      <VCardText>
        <VForm @submit.prevent="setConnection">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="baseUrl"
                variant="outlined"
                label="Transmission url"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="login"
                label="Login"
                variant="outlined"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Password"
                type="password"
                variant="outlined"
              />
            </VCol>

            <VCol
              cols="12"
              class="d-flex gap-4"
            >
              <VBtn
                type="submit"
                :loading="savingConnection"
              >
                Save
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
