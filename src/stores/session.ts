import { filesize } from 'filesize'
import type { ApiResponse } from '@/utils/api'

interface SessionStats {
  activeTorrentCount: number
  torrentCount: number
  downloadSpeed: number
  uploadSpeed: number
}

export const useSessionStore = defineStore(
  'session',
  () => {
    const loaded = ref(false)

    const authString = ref('bmFzLWFkbWluOktkbVlzbkZlMTU0OA==')
    const sessionId: Ref<string | null> = ref(null)

    const activeTorrents: Ref<number | null> = ref(null)
    const allTorrents: Ref<number | null> = ref(null)

    const downloadSpeedBytes: Ref<number | null> = ref(null)
    const uploadSpeedBytes: Ref<number | null> = ref(null)

    const downloadSpeed = computed(() => {
      if (downloadSpeedBytes.value)
        return `${filesize(downloadSpeedBytes.value)}/s`

      return ''
    })

    const uploadSpeed = computed(() => {
      if (uploadSpeedBytes.value)
        return `${filesize(uploadSpeedBytes.value)}/s`

      return ''
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

      fetchSessionStats,
    }
  },
)
