<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const $api = useApi(true)

const visible = ref(false)
const settingsStore = useSettingsStore()

// Speed limits
const speedLimitDown: Ref<number | null> = ref(null)
const speedLimitDownEnabled: Ref<boolean | null> = ref(null)
const speedLimitUp: Ref<number | null> = ref(null)
const speedLimitUpEnabled: Ref<boolean | null> = ref(null)
const altSpeedDown: Ref<number | null> = ref(null)
const altSpeedEnabled: Ref<boolean | null> = ref(null)
const altSpeedUp: Ref<number | null> = ref(null)

// Peers settings
const encryption: Ref<'preferred' | 'required' | 'tolerated' | null> = ref(null)
const dhtEnabled: Ref<boolean | null> = ref(null)
const lpdEnabled: Ref<boolean | null> = ref(null)
const pexEnabled: Ref<boolean | null> = ref(null)
const peerLimitGlobal: Ref<number | null> = ref(null)
const peerLimitPerTorrent: Ref<number | null> = ref(null)

// Network
const peerPort: Ref<number | null> = ref(null)
const peerPortRandomOnStart: Ref<boolean | null> = ref(null)
const portForwardingEnabled: Ref<boolean | null> = ref(null)
const utpEnabled: Ref<boolean | null> = ref(null)

// Folders
const downloadDir: Ref<string | null> = ref(null)
const incompleteDir: Ref<string | null> = ref(null)
const incompleteDirEnabled: Ref<boolean | null> = ref(null)
const renamePartialFiles: Ref<boolean | null> = ref(null)

// Start/stop
const downloadQueueEnabled: Ref<boolean | null> = ref(null)
const downloadQueueSize: Ref<number | null> = ref(null)
const seedQueueEnabled: Ref<boolean | null> = ref(null)
const seedQueueSize: Ref<number | null> = ref(null)
const seedRatioLimit: Ref<number | null> = ref(null)
const seedRatioLimited: Ref<boolean | null> = ref(null)
const idleSeedingLimit: Ref<number | null> = ref(null)
const idleSeedingLimitEnabled: Ref<boolean | null> = ref(null)

watch(visible, async newValue => {
  if (newValue) {
    await settingsStore.fetchSettings(false)

    // Speed limits
    speedLimitDown.value = settingsStore.speedLimitDown
    speedLimitDownEnabled.value = settingsStore.speedLimitDownEnabled
    speedLimitUp.value = settingsStore.speedLimitUp
    speedLimitUpEnabled.value = settingsStore.speedLimitUpEnabled
    altSpeedDown.value = settingsStore.altSpeedDown
    altSpeedEnabled.value = settingsStore.altSpeedEnabled
    altSpeedUp.value = settingsStore.altSpeedUp

    // Peers settings
    encryption.value = settingsStore.encryption
    dhtEnabled.value = settingsStore.dhtEnabled
    lpdEnabled.value = settingsStore.lpdEnabled
    pexEnabled.value = settingsStore.pexEnabled
    peerLimitGlobal.value = settingsStore.peerLimitGlobal
    peerLimitPerTorrent.value = settingsStore.peerLimitPerTorrent

    // Network
    peerPort.value = settingsStore.peerPort
    peerPortRandomOnStart.value = settingsStore.peerPortRandomOnStart
    portForwardingEnabled.value = settingsStore.portForwardingEnabled
    utpEnabled.value = settingsStore.utpEnabled

    // Folders
    downloadDir.value = settingsStore.downloadDir
    incompleteDir.value = settingsStore.incompleteDir
    incompleteDirEnabled.value = settingsStore.incompleteDirEnabled
    renamePartialFiles.value = settingsStore.renamePartialFiles

    // Start/stop
    downloadQueueEnabled.value = settingsStore.downloadQueueEnabled
    downloadQueueSize.value = settingsStore.downloadQueueSize
    seedQueueEnabled.value = settingsStore.seedQueueEnabled
    seedQueueSize.value = settingsStore.seedQueueSize
    seedRatioLimit.value = settingsStore.seedRatioLimit
    seedRatioLimited.value = settingsStore.seedRatioLimited
    idleSeedingLimit.value = settingsStore.idleSeedingLimit
    idleSeedingLimitEnabled.value = settingsStore.idleSeedingLimitEnabled
  }
})

const saveSettings = async () => {
  await $api(
    '/',
    {
      method: 'POST',
      body: {
        method: 'session-set',
        arguments: {
          'alt-speed-down': altSpeedDown.value,
          'alt-speed-enabled': altSpeedEnabled.value,
          'alt-speed-up': altSpeedUp.value,
          'dht-enabled': dhtEnabled.value,
          'download-dir': downloadDir.value,
          'download-queue-enabled': downloadQueueEnabled.value,
          'download-queue-size': downloadQueueSize.value,
          'encryption': encryption.value,
          'incomplete-dir-enabled': incompleteDirEnabled.value,
          'incomplete-dir': incompleteDir.value,
          'lpd-enabled': lpdEnabled.value,
          'peer-limit-global': peerLimitGlobal.value,
          'peer-limit-per-torrent': peerLimitPerTorrent.value,
          'peer-port-random-on-start': peerPortRandomOnStart.value,
          'peer-port': peerPort.value,
          'pex-enabled': pexEnabled.value,
          'port-forwarding-enabled': portForwardingEnabled.value,
          'rename-partial-files': renamePartialFiles.value,
          'seed-queue-enabled': seedQueueEnabled.value,
          'seed-queue-size': seedQueueSize.value,
          'seedRatioLimit': seedRatioLimit.value,
          'seedRatioLimited': seedRatioLimited.value,
          'speed-limit-down-enabled': speedLimitDownEnabled.value,
          'speed-limit-down': speedLimitDown.value,
          'speed-limit-up-enabled': speedLimitUpEnabled.value,
          'speed-limit-up': speedLimitUp.value,
          'idle-seeding-limit-enabled': idleSeedingLimitEnabled.value,
          'idle-seeding-limit': idleSeedingLimit.value,
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
            <VToolbarTitle>Preferences</VToolbarTitle>
          </VCardText>
          <VSpacer />

          <VToolbarItems>
            <VBtn
              variant="text"
              @click="saveSettings"
            >
              Save
            </VBtn>
          </VToolbarItems>
        </VToolbar>
      </div>
      <VCardText>
        <VRow class="ma-0">
          <VCol class="settings-block">
            <VCard
              title="Queues and ratio"
              variant="outlined"
            >
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <VSwitch
                      v-model="downloadQueueEnabled"
                      label="Enable download queue"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="downloadQueueSize"
                      label="Download queue size"
                      variant="outlined"
                      type="number"
                      :disabled="!downloadQueueEnabled"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="seedQueueEnabled"
                      label="Enable upload queue"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="seedQueueSize"
                      label="Upload queue size"
                      variant="outlined"
                      type="number"
                      :disabled="!seedQueueEnabled"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="seedRatioLimited"
                      label="Stop seeding at ratio"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="seedRatioLimit"
                      label="Ratio limit"
                      variant="outlined"
                      type="number"
                      :disabled="!seedRatioLimited"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="idleSeedingLimitEnabled"
                      label="Stop seeding if idle for N minutes"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="idleSeedingLimit"
                      label="Maximum idle time (minutes)"
                      variant="outlined"
                      type="number"
                      :disabled="!idleSeedingLimitEnabled"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol class="settings-block">
            <VCard
              title="Folders"
              variant="outlined"
            >
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="downloadDir"
                      label="Download to"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="incompleteDirEnabled"
                      label="Use temporary folder"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="incompleteDir"
                      label="Temporary folder"
                      variant="outlined"
                      :disabled="!incompleteDirEnabled"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="renamePartialFiles"
                      label="Append 'part' to incomplete files' names"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol class="settings-block">
            <VCard
              title="Speed limits"
              variant="outlined"
            >
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <VSwitch
                      v-model="speedLimitDownEnabled"
                      label="Limit download speed"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="speedLimitDown"
                      label="Download speed"
                      variant="outlined"
                      type="number"
                      :disabled="!speedLimitDownEnabled"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="speedLimitUpEnabled"
                      label="Limit upload speed"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="speedLimitUp"
                      label="Upload speed"
                      variant="outlined"
                      type="number"
                      :disabled="!speedLimitUpEnabled"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="altSpeedEnabled"
                      label="Use alternative speed limits"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="altSpeedDown"
                      label="Download speed"
                      variant="outlined"
                      type="number"
                      :disabled="!altSpeedEnabled"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="altSpeedUp"
                      label="Upload speed"
                      variant="outlined"
                      type="number"
                      :disabled="!altSpeedEnabled"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol class="settings-block">
            <VCard
              title="Network"
              variant="outlined"
            >
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="peerPort"
                      label="Listening port"
                      type="number"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="peerPortRandomOnStart"
                      label="Randomize port on start"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="portForwardingEnabled"
                      label="Use port forwarding"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="utpEnabled"
                      label="Enable utp"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol class="settings-block">
            <VCard
              title="Peers"
              variant="outlined"
            >
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="peerLimitPerTorrent"
                      label="Max peers per torrent"
                      type="number"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model.number="peerLimitGlobal"
                      label="Max peers overall"
                      type="number"
                      variant="outlined"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSelect
                      v-model="encryption"
                      :items="['preferred', 'required', 'tolerated']"
                      label="Encryption"
                      placeholder="Encryption"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="dhtEnabled"
                      label="Enable DHT"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="pexEnabled"
                      label="Enable PEX"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="lpdEnabled"
                      label="Enable LPD"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.settings-block {
  min-width: 300px;
}
</style>
