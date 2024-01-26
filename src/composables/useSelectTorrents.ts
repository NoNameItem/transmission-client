import { useTorrentListStore } from '@/stores/torrentList'

export const useSelectTorrents = torrentId => {
  const torrentListStore = useTorrentListStore()
  const ctrlState = useKeyModifier('Control')
  const commandState = useKeyModifier('Meta')

  const isSelected = computed(() => torrentListStore.selectedTorrents.includes(torrentId))

  const select = () => {
    if (!ctrlState.value && !commandState.value) {
      // torrentListStore.selectedTorrents = [props.torrent.id]

      if (!torrentListStore.selectedTorrents.includes(torrentId))
        torrentListStore.selectedTorrents = [torrentId]
      else
        if (torrentListStore.selectedTorrents.length > 1)
          torrentListStore.selectedTorrents = [torrentId]
        else
          torrentListStore.selectedTorrents = torrentListStore.selectedTorrents.filter(item => item !== torrentId)

      return
    }

    if (!torrentListStore.selectedTorrents.includes(torrentId))
      torrentListStore.selectedTorrents.push(torrentId)
    else
      torrentListStore.selectedTorrents = torrentListStore.selectedTorrents.filter(item => item !== torrentId)
  }

  return { isSelected, select }
}
