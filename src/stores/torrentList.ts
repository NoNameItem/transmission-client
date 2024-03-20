import sortArray from 'sort-array'
import { DateTime } from 'luxon'
import { TorrentStatus } from '@/interfaces/torrents'
import type { TorrentListInfo } from '@/interfaces/torrents'
import type { ApiResponse } from '@/utils/api'
import { useApi } from '@/composables/useApi'
import { useConnectionStore } from '@/stores/connection'

export const useTorrentListStore = defineStore(
  'torrentList',
  () => {
    const _torrents: Ref<TorrentListInfo[]> = ref([])

    const selectedTorrents: Ref<number[]> = ref([])

    const compactView = ref(false)
    const showMenu = ref(true)

    const statusesForFilter: Ref<TorrentStatus[]> = ref([])
    const filterString: Ref<string | null> = ref(null)
    const sortByField = ref('queuePosition')
    const sortDescending = ref(false)
    const showErrors: Ref<'Y' | 'N' | 'O'> = ref('Y')

    watch([statusesForFilter, filterString], () => {
      selectedTorrents.value = []
    })

    const downloadCount = computed(() => _torrents.value.filter(torrent => torrent.status === TorrentStatus.Downloading).length)
    const activeDownloadCount = computed(() => _torrents.value.filter(torrent => torrent.status === TorrentStatus.Downloading && torrent.rateDownload > 0).length)
    const uploadCount = computed(() => _torrents.value.filter(torrent => torrent.status === TorrentStatus.Seeding).length)
    const activeUploadCount = computed(() => _torrents.value.filter(torrent => torrent.status === TorrentStatus.Seeding && torrent.rateUpload > 0).length)
    const errorCount = computed(() => _torrents.value.filter(torrent => torrent.error !== 0).length)

    const torrents = computed(
      () => sortArray(_torrents.value
        .map(torrent => ({
          ...torrent,
          activityDate: torrent.activityDate === 0 ? torrent.addedDate : torrent.activityDate,
        }))
        .map(torrent => ({
          ...torrent,
          etaNulled: torrent.error === 0 && torrent.eta >= 0 && (torrent.status === TorrentStatus.Downloading || torrent.status === TorrentStatus.Seeding) ? torrent.eta : null,
          lastActive: DateTime.now().set({ millisecond: 0 }).diff(DateTime.fromSeconds(torrent.activityDate), 'seconds', { locale: 'en-Us' }),
          added: DateTime.now().set({ millisecond: 0 }).diff(DateTime.fromSeconds(torrent.addedDate), 'seconds', { locale: 'en-Us' }),
          etaIdle: torrent.etaIdle === -1 ? null : torrent.etaIdle,
        }))
        .map(torrent => ({
          ...torrent,
          etaCombined: torrent.etaNulled ?? torrent.etaIdle,
        }))
        .filter(torrent => (statusesForFilter.value.length === 0 || statusesForFilter.value.includes(torrent.status)))
        .filter(torrent => (!filterString.value || RegExp(filterString.value.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1'), 'ig').test(torrent.name)))
        .filter(torrent => showErrors.value === 'Y' ? true : showErrors.value === 'N' ? torrent.error === 0 : torrent.error !== 0),
      { by: sortByField.value, order: sortDescending.value ? 'desc' : 'asc' }),
    )

    const resetFilters = () => {
      statusesForFilter.value = []
      filterString.value = null
      showErrors.value = 'Y'
    }

    const fetchTorrentList = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      const data = await $api<ApiResponse<{ torrents: TorrentListInfo[] }>>('/', {
        method: 'POST',
        body: {
          method: 'torrent-get',
          arguments: {
            fields: [
              'id',
              'queuePosition',
              'name',

              'status',

              'downloadedEver',
              'uploadedEver',
              'sizeWhenDone',
              'totalSize',

              'percentDone',
              'uploadRatio',
              'recheckProgress',
              'eta',
              'etaIdle',

              'rateDownload',
              'rateUpload',
              'seedRatioLimit',

              'peersConnected',
              'peersSendingToUs',
              'peersGettingFromUs',

              'error',
              'errorString',

              'activityDate',
              'addedDate',
            ],
          },
        },
      })

      if (data.result === 'success')
        _torrents.value = data.arguments.torrents

      setTimeout(fetchTorrentList, 5000)
    }

    const toggleView = () => {
      compactView.value = !compactView.value
    }

    const clearSelection = () => {
      selectedTorrents.value = []
    }

    const deleteSelection = async (deleteData: boolean) => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'torrent-remove',
          arguments: {
            'ids': selectedTorrents.value,
            'delete-local-data': deleteData,
          },

        },
      })
      clearSelection()
    }

    const startSelected = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'torrent-start',
          arguments: {
            ids: selectedTorrents.value,
          },
        },
      })
    }

    const stopSelected = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'torrent-stop',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const verifySelected = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'torrent-verify',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const queueMoveTopSelected = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'queue-move-top',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const queueMoveUpSelected = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'queue-move-up',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const queueMoveDownSelected = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'queue-move-down',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const queueMoveBottomSelected = async () => {
      const connectionStore = useConnectionStore()

      if (!connectionStore.connectionSet)
        return

      const $api = useApi(true)

      await $api('/', {
        method: 'POST',
        body: {
          method: 'queue-move-bottom',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const toggleMenu = () => {
      showMenu.value = !showMenu.value
    }

    return {
      torrents,
      downloadCount,
      activeDownloadCount,
      uploadCount,
      activeUploadCount,
      errorCount,
      selectedTorrents,
      statusesForFilter,
      filterString,
      sortByField,
      sortDescending,
      compactView,
      showMenu,
      showErrors,
      toggleView,
      toggleMenu,
      fetchTorrentList,
      clearSelection,
      deleteSelection,
      startSelected,
      stopSelected,
      verifySelected,
      queueMoveTopSelected,
      queueMoveUpSelected,
      queueMoveDownSelected,
      queueMoveBottomSelected,
      resetFilters,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['statusesForFilter', 'filterString', 'sortByField', 'sortDescending', 'compactView', 'showMenu'],
    },
  },
)
