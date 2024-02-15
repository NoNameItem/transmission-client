import { useApi } from '@/composables/useApi'
import { useSessionStore } from '@/stores/session'
import { useTorrentListStore } from '@/stores/torrentList'
import { useSettingsStore } from '@/stores/settings'

export const useConnectionStore = defineStore(
  'connection',
  () => {
    const connectionSet = ref(false)
    const baseUrl: Ref<string | null> = ref(null)
    const authString: Ref<string | null> = ref(null)

    const getAuthString = (login: string, password: string): string => {
      return btoa(`${login}:${password}`)
    }

    const startFetch = async () => {
      const settingsStore = useSettingsStore()
      const sessionStats = useSessionStore()
      const torrentListStore = useTorrentListStore()

      await sessionStats.fetchSessionStats()
      await torrentListStore.fetchTorrentList()
      await settingsStore.fetchSettings(true)
    }

    const setupConnection = async (newBaseUrl: string, newLogin: string, newPassword: string): Promise<boolean> => {
      const newAuthString = getAuthString(newLogin, newPassword)

      baseUrl.value = newBaseUrl
      authString.value = newAuthString

      const $api = useApi(false)

      try {
        await $api('/', {
          method: 'POST',
          body: {
            method: 'session-stats',
          },
        })

        connectionSet.value = true
        await startFetch()

        return true
      }
      catch (e) {
        console.log(e.response.status)
        if (e.response.status === 409) {
          const sessionStore = useSessionStore()

          sessionStore.sessionId = e.response.headers.get('X-Transmission-Session-Id')
          connectionSet.value = true
          await startFetch()

          return true
        }

        return false
      }
    }

    const disconnect = () => {
      connectionSet.value = false
    }

    return {
      connectionSet,
      baseUrl,
      authString,

      setupConnection,
      startFetch,
      disconnect,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['connectionSet', 'baseUrl', 'authString'],
    },
  },
)
