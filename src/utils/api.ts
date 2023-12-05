import { ofetch } from 'ofetch'
import { useSessionStore } from '@/stores/session'
import { store } from '@/plugins/2.pinia'

export interface ApiResponse<T> {
  result: string
  arguments: T
}

export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  async onRequest({ options }) {
    const sessionStore = useSessionStore(store)
    const accessToken = sessionStore.authString
    const sessionId = sessionStore.sessionId ?? ''

    options.retry = 10
    options.retryDelay = 60000
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
