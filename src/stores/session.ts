import { filesize } from 'filesize'
import type { ApiResponse } from '@/utils/api'

interface Stats {
  downloadedBytes: number
  uploadedBytes: number
}

interface SessionStats {
  activeTorrentCount: number
  torrentCount: number
  downloadSpeed: number
  uploadSpeed: number
  'cumulative-stats': Stats

}

export const useSessionStore = defineStore(
  'session',
  () => {
    const loaded = ref(false)

    const authString = ref(import.meta.env.VITE_AUTH_STRING)
    const sessionId: Ref<string | null> = ref(null)

    const activeTorrents: Ref<number | null> = ref(null)
    const allTorrents: Ref<number | null> = ref(null)

    const downloadSpeedBytes: Ref<number | null> = ref(null)
    const uploadSpeedBytes: Ref<number | null> = ref(null)

    const downloadedBytes: Ref<number | null> = ref(null)
    const uploadedBytes: Ref<number | null> = ref(null)

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

    const ratio = computed(() => {
      if (uploadedBytes.value && downloadedBytes.value)
        return (uploadedBytes.value / downloadedBytes.value).toFixed(2)

      return 'N/A'
    })

    const fetchSessionStats = async () => {
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

        useTitle(`↓${downloadSpeed.value} ↑${uploadSpeed.value}`)
      }

      setTimeout(fetchSessionStats, 5000)
    }

    return {
      loaded,
      authString,
      sessionId,
      activeTorrents,
      allTorrents,
      downloadSpeed,
      uploadSpeed,
      downloaded,
      uploaded,
      ratio,

      fetchSessionStats,
    }
  },
)
