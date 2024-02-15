import type { ApiResponse } from '@/utils/api'
import { useApi } from '@/composables/useApi'
import { useConnectionStore } from '@/stores/connection'

interface Settings {

  // Speed limits
  'speed-limit-down': number
  'speed-limit-down-enabled': boolean
  'speed-limit-up': number
  'speed-limit-up-enabled': boolean
  'alt-speed-down': number
  'alt-speed-enabled': boolean
  'alt-speed-up': number

  // Peers settings
  'encryption': ('preferred' | 'required' | 'tolerated')
  'dht-enabled': boolean
  'lpd-enabled': boolean
  'pex-enabled': boolean
  'peer-limit-global': number
  'peer-limit-per-torrent': number

  // Network
  'peer-port': number
  'peer-port-random-on-start': boolean
  'port-forwarding-enabled': boolean
  'utp-enabled': boolean

  // Folders
  'download-dir': string
  'incomplete-dir': string
  'incomplete-dir-enabled': boolean
  'rename-partial-files': boolean

  // Start/stop
  'download-queue-enabled': boolean
  'download-queue-size': number
  'seed-queue-enabled': boolean
  'seed-queue-size': number
  'seedRatioLimit': number
  'seedRatioLimited': boolean
  'idle-seeding-limit-enabled': boolean
  'idle-seeding-limit': number
  'start-added-torrents': boolean
}

export const useSettingsStore = defineStore(
  'settinigs',
  () => {
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
    const startAddedTorrents: Ref<boolean | null> = ref(null)

    const fetchSettings = async (repeat: boolean) => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      const data = await $api<ApiResponse<Settings>>('/', {
        method: 'POST',
        body: {
          method: 'session-get',
        },
      })

      if (data.result === 'success') {
        speedLimitDown.value = data.arguments['speed-limit-down']
        speedLimitDownEnabled.value = data.arguments['speed-limit-down-enabled']
        speedLimitUp.value = data.arguments['speed-limit-up']
        speedLimitUpEnabled.value = data.arguments['speed-limit-up-enabled']
        altSpeedDown.value = data.arguments['alt-speed-down']
        altSpeedEnabled.value = data.arguments['alt-speed-enabled']
        altSpeedUp.value = data.arguments['alt-speed-up']
        encryption.value = data.arguments['encryption']
        dhtEnabled.value = data.arguments['dht-enabled']
        lpdEnabled.value = data.arguments['lpd-enabled']
        pexEnabled.value = data.arguments['pex-enabled']
        peerLimitGlobal.value = data.arguments['peer-limit-global']
        peerLimitPerTorrent.value = data.arguments['peer-limit-per-torrent']
        peerPort.value = data.arguments['peer-port']
        peerPortRandomOnStart.value = data.arguments['peer-port-random-on-start']
        portForwardingEnabled.value = data.arguments['port-forwarding-enabled']
        utpEnabled.value = data.arguments['utp-enabled']
        downloadDir.value = data.arguments['download-dir']
        incompleteDir.value = data.arguments['incomplete-dir']
        incompleteDirEnabled.value = data.arguments['incomplete-dir-enabled']
        renamePartialFiles.value = data.arguments['rename-partial-files']
        downloadQueueEnabled.value = data.arguments['download-queue-enabled']
        downloadQueueSize.value = data.arguments['download-queue-size']
        seedQueueEnabled.value = data.arguments['seed-queue-enabled']
        seedQueueSize.value = data.arguments['seed-queue-size']
        seedRatioLimit.value = data.arguments['seedRatioLimit']
        seedRatioLimited.value = data.arguments['seedRatioLimited']
        idleSeedingLimit.value = data.arguments['idle-seeding-limit']
        idleSeedingLimitEnabled.value = data.arguments['idle-seeding-limit-enabled']
        startAddedTorrents.value = data.arguments['start-added-torrents']
      }
      if (repeat)
        setTimeout(fetchSettings, 60000)
    }

    return {
      speedLimitDown,
      speedLimitDownEnabled,
      speedLimitUp,
      speedLimitUpEnabled,
      altSpeedDown,
      altSpeedEnabled,
      altSpeedUp,
      encryption,
      dhtEnabled,
      lpdEnabled,
      pexEnabled,
      peerLimitGlobal,
      peerLimitPerTorrent,
      peerPort,
      peerPortRandomOnStart,
      portForwardingEnabled,
      utpEnabled,
      downloadDir,
      incompleteDir,
      incompleteDirEnabled,
      renamePartialFiles,
      downloadQueueEnabled,
      downloadQueueSize,
      seedQueueEnabled,
      seedQueueSize,
      seedRatioLimit,
      seedRatioLimited,
      idleSeedingLimit,
      idleSeedingLimitEnabled,
      startAddedTorrents,

      fetchSettings,
    }
  },
)
