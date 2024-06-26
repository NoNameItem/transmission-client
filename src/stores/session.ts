import { filesize } from 'filesize'
import type { ApiResponse } from '@/utils/api'
import { useConnectionStore } from '@/stores/connection'

interface Stats {
  downloadedBytes: number
  uploadedBytes: number
  secondsActive: number
}

interface SessionStats {
  activeTorrentCount: number
  torrentCount: number
  downloadSpeed: number
  uploadSpeed: number
  'cumulative-stats': Stats
  'current-stats': Stats

}

export const useSessionStore = defineStore(
  'session',
  () => {
    const loaded = ref(false)

    const sessionId: Ref<string | null> = ref(null)

    const activeTorrents: Ref<number | null> = ref(null)
    const allTorrents: Ref<number | null> = ref(null)

    const downloadSpeedBytes: Ref<number | null> = ref(null)
    const uploadSpeedBytes: Ref<number | null> = ref(null)

    const downloadedBytes: Ref<number | null> = ref(null)
    const uploadedBytes: Ref<number | null> = ref(null)

    const downloadedBytesSession: Ref<number | null> = ref(null)
    const uploadedBytesSession: Ref<number | null> = ref(null)
    const secondsActive: Ref<number | null> = ref(null)

    const downloadSpeed = computed(() => {
      if (downloadSpeedBytes.value)
        return `${filesize(downloadSpeedBytes.value)}/s`

      return '0 B/s'
    })

    const downloaded = computed(() => {
      if (downloadedBytes.value)
        return filesize(downloadedBytes.value)

      return '0 B'
    })

    const downloadedSession = computed(() => {
      if (downloadedBytesSession.value)
        return filesize(downloadedBytesSession.value)

      return '0 B'
    })

    const uploadSpeed = computed(() => {
      if (uploadSpeedBytes.value)
        return `${filesize(uploadSpeedBytes.value)}/s`

      return '0 B/s'
    })

    const uploaded = computed(() => {
      if (uploadedBytes.value)
        return filesize(uploadedBytes.value)

      return '0 B'
    })

    const uploadedSession = computed(() => {
      if (uploadedBytesSession.value)
        return filesize(uploadedBytesSession.value)

      return '0 B'
    })

    const ratio = computed(() => {
      if (uploadedBytes.value && downloadedBytes.value)
        return (uploadedBytes.value / downloadedBytes.value).toFixed(2)

      return 'N/A'
    })

    const ratioSession = computed(() => {
      if (uploadedBytesSession.value && downloadedBytesSession.value)
        return (uploadedBytesSession.value / downloadedBytesSession.value).toFixed(2)

      return 'N/A'
    })

    const fetchSessionStats = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      const data = await $api<ApiResponse<SessionStats>>('/', {
        method: 'POST',
        body: {
          method: 'session-stats',
        },
      })

      if (data.result === 'success') {
        loaded.value = true
        activeTorrents.value = data.arguments.activeTorrentCount
        allTorrents.value = data.arguments.torrentCount
        downloadSpeedBytes.value = data.arguments.downloadSpeed
        uploadSpeedBytes.value = data.arguments.uploadSpeed
        downloadedBytes.value = data.arguments['cumulative-stats'].downloadedBytes
        uploadedBytes.value = data.arguments['cumulative-stats'].uploadedBytes
        downloadedBytesSession.value = data.arguments['current-stats'].downloadedBytes
        uploadedBytesSession.value = data.arguments['current-stats'].uploadedBytes
        secondsActive.value = data.arguments['current-stats'].secondsActive

        useTitle(`↓${downloadSpeed.value} ↑${uploadSpeed.value}`)
      }

      setTimeout(fetchSessionStats, 5000)
    }

    return {
      loaded,
      sessionId,
      activeTorrents,
      allTorrents,
      downloadSpeed,
      uploadSpeed,
      downloaded,
      uploaded,
      ratio,
      downloadedSession,
      uploadedSession,
      ratioSession,
      secondsActive,

      fetchSessionStats,
    }
  },
)
