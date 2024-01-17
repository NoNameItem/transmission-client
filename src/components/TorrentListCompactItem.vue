<script setup lang="ts">
import { filesize } from 'filesize'
import { Duration } from 'luxon'
import type { TorrentListInfo } from '@/interfaces/torrents'
import { TorrentStatus } from '@/interfaces/torrents'
import { useSettingsStore } from '@/stores/settings'
import { useTorrentListStore } from '@/stores/torrentList'

const props = defineProps<{ torrent: TorrentListInfo }>()

const torrentListStore = useTorrentListStore()
const settingsStore = useSettingsStore()

const maxRatio = computed(
  () => {
    return settingsStore.seedRatioLimited ? settingsStore.seedRatioLimit : 0
  },
)

const isPausedDownload = computed(() => props.torrent.error === 0 && props.torrent.status === TorrentStatus.Stopped && props.torrent.percentDone < 1)
const isPausedUpload = computed(() => props.torrent.error === 0 && props.torrent.status === TorrentStatus.Stopped && props.torrent.percentDone === 1)

const progressBarColor = computed(() => {
  if (props.torrent.error !== 0)
    return 'error'

  switch (props.torrent.status) {
    case TorrentStatus.Stopped:
      if (isPausedDownload.value)
        return 'info'
      if (isPausedUpload)
        return 'success'

      return 'secondary'
    case TorrentStatus.QueuedToDownload:
    case TorrentStatus.Downloading:
      return 'info'
    case TorrentStatus.QueuedToSeed:
    case TorrentStatus.Seeding:
      return 'success'
    case TorrentStatus.QueuedToVerify:
    case TorrentStatus.Verifying:
      return 'warning'
  }
})

const textColor = computed(() => {
  if (props.torrent.error !== 0)
    return 'error'

  switch (props.torrent.status) {
    case TorrentStatus.Stopped:
      return 'secondary'
    case TorrentStatus.QueuedToDownload:
    case TorrentStatus.Downloading:
      return 'info'
    case TorrentStatus.QueuedToSeed:
    case TorrentStatus.Seeding:
      return 'success'
    case TorrentStatus.QueuedToVerify:
    case TorrentStatus.Verifying:
      return 'warning'
  }
})

const progressBarStriped = computed(() => {
  switch (props.torrent.status) {
    case TorrentStatus.QueuedToSeed:
    case TorrentStatus.QueuedToDownload:
    case TorrentStatus.QueuedToVerify:
      return true
    default:
      return props.torrent.error !== 0 || isPausedUpload.value || isPausedDownload.value
  }
})

const progress = computed(() => {
  switch (props.torrent.status) {
    case TorrentStatus.QueuedToVerify:
    case TorrentStatus.Verifying:
      return props.torrent.recheckProgress * 100
    case TorrentStatus.QueuedToSeed:
    case TorrentStatus.Seeding:
      if (props.torrent.seedRatioLimit)
        return (props.torrent.uploadRatio / maxRatio.value) * 100

      return props.torrent.percentDone * 100
    case TorrentStatus.Stopped:
      if (isPausedDownload.value)
        return props.torrent.percentDone * 100

      if (isPausedUpload.value) {
        if (props.torrent.seedRatioLimit)
          return (props.torrent.uploadRatio / maxRatio.value) * 100

        return props.torrent.percentDone * 100
      }

      break
    default:
      return props.torrent.percentDone * 100
  }
})

const downloadSpeed = computed(() => (props.torrent.error === 0 && props.torrent.status === TorrentStatus.Downloading ? `▼ ${filesize((props.torrent.rateDownload))}/s` : ''))

const uploadSpeed = computed(() => props.torrent.error === 0 && (props.torrent.status === TorrentStatus.Downloading || props.torrent.status === TorrentStatus.Seeding) ? `▲ ${filesize((props.torrent.rateUpload))}/s` : '')

const showPercentage = computed(() => [
  TorrentStatus.QueuedToDownload,
  TorrentStatus.Downloading,
  TorrentStatus.QueuedToVerify,
  TorrentStatus.Verifying,
  TorrentStatus.QueuedToSeed,
  TorrentStatus.Seeding,
].includes(props.torrent.status) || isPausedUpload.value || isPausedDownload.value)

const stats = computed(() => {
  if (props.torrent.error !== 0)
    return props.torrent.errorString

  let statsString = ''
  statsString += ` Size: ${filesize(props.torrent.sizeWhenDone)}`
  statsString += ` Ratio: ${props.torrent.uploadRatio.toFixed(2)}`
  statsString += maxRatio.value ? ` of ${maxRatio.value}` : ''

  if ((props.torrent.status === TorrentStatus.Downloading || (props.torrent.status === TorrentStatus.Seeding && props.torrent.seedRatioLimit)) && (props.torrent.rateUpload > 0 || props.torrent.rateDownload > 0)) {
    const eta = Duration.fromObject({ seconds: props.torrent.etaNulled }, { locale: 'en-Us' })

    // statsString += props.torrent.etaNulled ? ` - ${eta.rescale().toHuman()} remaining` : ' - remaining time unknown'
    statsString += ` Remaining: ${props.torrent.etaNulled ? eta.rescale().toHuman({ unitDisplay: 'short' }) : 'unknown'}`
  }

  if (props.torrent.rateDownload === 0 && props.torrent.rateUpload === 0) {
    if (props.torrent.activityDate !== 0 && props.torrent.lastActive)
      statsString += ` Last active: ${props.torrent.lastActive.rescale().toHuman({ unitDisplay: 'short' })} ago`

    else
      statsString += ' Last active: never'
  }

  return statsString
})

const isSelected = computed(() => torrentListStore.selectedTorrents.includes(props.torrent.id))

const ctrlState = useKeyModifier('Control')
const commandState = useKeyModifier('Meta')

const select = () => {
  if (!ctrlState.value && !commandState.value) {
    // torrentListStore.selectedTorrents = [props.torrent.id]

    if (!torrentListStore.selectedTorrents.includes(props.torrent.id))
      torrentListStore.selectedTorrents = [props.torrent.id]
    else
      torrentListStore.selectedTorrents = torrentListStore.selectedTorrents.filter(item => item !== props.torrent.id)

    return
  }

  if (!torrentListStore.selectedTorrents.includes(props.torrent.id))
    torrentListStore.selectedTorrents.push(props.torrent.id)
  else
    torrentListStore.selectedTorrents = torrentListStore.selectedTorrents.filter(item => item !== props.torrent.id)
}
</script>

<template>
  <VListItem
    :base-color="textColor"
    :active="isSelected"
    @click="select"
  >
    <VListItemTitle :value="props.torrent.id">
      ({{ props.torrent.queuePosition + 1 }}) {{ props.torrent.name }}
      <VRow>
        <VCol
          cols="auto"
          class="pr-0 d-none d-md-block"
        >
          <div class="progres-bar-container">
            <VProgressLinear
              height="20"
              rounded
              :model-value="progress"
              :bg-color="progressBarColor"
              :color="progressBarColor"
              :striped="progressBarStriped"
            />
          </div>
        </VCol>
        <VCol cols="auto">
          <div class="text-sm stats">
            <span v-if="showPercentage">{{ progress.toFixed(2) }}% </span> {{ downloadSpeed }} {{ uploadSpeed }} {{ stats }}
          </div>
        </VCol>
      </VRow>
    </VListItemTitle>
  </VListItem>
</template>

<style scoped lang="scss">
.stats {
  white-space: break-spaces;
}

.progres-bar-container {
  width: 200px
}
</style>
