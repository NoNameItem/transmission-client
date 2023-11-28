import sortArray from 'sort-array'
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
    const sortByField = ref('name')
    const sortDescending = ref(false)

    const torrents = computed(
      () => sortArray(_torrents.value
        .map(torrent => ({
          ...torrent,
          etaNulled: torrent.error === 0 && torrent.eta >= 0 && (torrent.status === TorrentStatus.Downloading || torrent.status === TorrentStatus.Seeding) ? torrent.eta : null,
        }))
        .filter(torrent => (statusesForFilter.value.length === 0 || statusesForFilter.value.includes(torrent.status)))
        .filter(torrent => (!filterString.value || RegExp(filterString.value, 'ig').test(torrent.name))),
      { by: sortByField.value, order: sortDescending.value ? 'desc' : 'asc' }),
    )

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

              'rateDownload',
              'rateUpload',
              'seedRatioLimit',

              'peersConnected',
              'peersSendingToUs',
              'peersGettingFromUs',

              'error',
              'errorString',
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

    const startSelected = () => {
      $api('/', {
        method: 'POST',
        body: {
          method: 'torrent-start',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const stopSelected = () => {
      $api('/', {
        method: 'POST',
        body: {
          method: 'torrent-stop',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    const verifySelected = () => {
      $api('/', {
        method: 'POST',
        body: {
          method: 'torrent-verify',
          arguments: {
            ids: selectedTorrents.value,
          },

        },
      })
    }

    return {
      torrents,
      selectedTorrents,
      statusesForFilter,
      filterString,
      sortByField,
      sortDescending,
      fetchTorrentList,
      clearSelection,
      startSelected,
      stopSelected,
      verifySelected,
    }
  },
)
