import sortArray from 'sort-array'
import { DateTime } from 'luxon'
import { TorrentStatus } from '@/interfaces/torrents'
import type { TorrentListInfo } from '@/interfaces/torrents'
import type { ApiResponse } from '@/utils/api'

export const useTorrentListStore = defineStore(
  'torrentList',
  () => {
    const _torrents: Ref<TorrentListInfo[]> = ref([])

    const selectedTorrents: Ref<number[]> = ref([])

    const statusesForFilter: Ref<TorrentStatus[]> = ref([])
    const filterString: Ref<string | null> = ref(null)
    const sortByField = ref('queuePosition')
    const sortDescending = ref(false)

    watch([statusesForFilter, filterString], () => {
      selectedTorrents.value = []
    })

    const downloadCount = computed(() => _torrents.value.filter(torrent => torrent.status === TorrentStatus.Downloading).length)
    const uploadCount = computed(() => _torrents.value.filter(torrent => torrent.status === TorrentStatus.Seeding).length)

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
        }))
        .filter(torrent => (statusesForFilter.value.length === 0 || statusesForFilter.value.includes(torrent.status)))
        .filter(torrent => (!filterString.value || RegExp(filterString.value, 'ig').test(torrent.name))),
      { by: sortByField.value, order: sortDescending.value ? 'desc' : 'asc' }),
    )

    const resetFilters = () => {
      statusesForFilter.value = []
      filterString.value = null
    }

    const fetchTorrentList = async () => {
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

    const clearSelection = () => {
      selectedTorrents.value = []
    }

    const deleteSelection = async (deleteData: boolean) => {
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

    return {
      torrents,
      downloadCount,
      uploadCount,
      selectedTorrents,
      statusesForFilter,
      filterString,
      sortByField,
      sortDescending,
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
      paths: ['statusesForFilter', 'filterString', 'sortByField', 'sortDescending'],
    },
  },
)
