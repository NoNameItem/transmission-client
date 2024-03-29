import { ofetch } from 'ofetch'
import { useSessionStore } from '@/stores/session'
import { store } from '@/plugins/2.pinia'
import { useConnectionStore } from '@/stores/connection'

export const useApi = (retry: boolean) => {
  const connectionStore = useConnectionStore()

  return ofetch.create({
    baseURL: connectionStore.baseUrl,
    async onRequest({ options }) {
      const sessionStore = useSessionStore(store)
      const accessToken = connectionStore.authString
      const sessionId = sessionStore.sessionId ?? ''

      options.retry = retry ? 10 : 0
      if (accessToken) {
        options.headers = {
          ...options.headers,
          'Authorization': `Basic ${accessToken}`,
          'X-Transmission-Session-Id': sessionId,
        }
      }
    },
    async onResponseError({ request, response, options }) {
      if (response.status === 409) {
        const sessionStore = useSessionStore(store)

        sessionStore.sessionId = response.headers.get('X-Transmission-Session-Id')
      }
    },
  })
}
