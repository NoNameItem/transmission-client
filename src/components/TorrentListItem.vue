<script setup lang="ts">
import {filesize} from 'filesize'
import {Duration, DateTime} from 'luxon'
import type {TorrentListInfo} from '@/interfaces/torrents'
import {getStatusName, TorrentStatus} from '@/interfaces/torrents'
import {useSettingsStore} from "@/stores/settings";
import {useTorrentListStore} from "@/stores/torrentList";

const props = defineProps<{ torrent: TorrentListInfo }>()

const torrentListStore = useTorrentListStore()
const settingsStore = useSettingsStore()

const maxRatio = computed(
  () => {
    const global = settingsStore.seedRatioLimited ? settingsStore.seedRatioLimit : 0
    const local = props.torrent.seedRatioLimit

    return Math.max(<number>global, local)
  }
)

const status = computed(() => props.torrent.error !== 0 ? `${getStatusName(props.torrent.status)} - Error` : getStatusName(props.torrent.status))

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

const peersStats = computed(() => {
  if (props.torrent.error === 0) {
    switch (props.torrent.status) {
      case TorrentStatus.Seeding:
        return `to ${props.torrent.peersGettingFromUs} of ${props.torrent.peersConnected} peers`
      case TorrentStatus.Downloading:
        return `from ${props.torrent.peersSendingToUs} of ${props.torrent.peersConnected} peers`
    }
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
  statsString += `Downloaded: ${filesize(props.torrent.downloadedEver)}`
  statsString += props.torrent.sizeWhenDone !== props.torrent.totalSize ? ` - Selected: ${filesize(props.torrent.sizeWhenDone)}` : ''
  statsString += ` - Total: ${filesize(props.torrent.totalSize)}`
  statsString += ` - Uploaded: ${filesize(props.torrent.uploadedEver)}`
  statsString += ` - Ratio: ${props.torrent.uploadRatio.toFixed(2)}`
  statsString += maxRatio.value ? ` of ${maxRatio.value}` : ''

  statsString += ` - added ${props.torrent.added.rescale().toHuman()} ago`

  if (props.torrent.status === TorrentStatus.Downloading || (props.torrent.status === TorrentStatus.Seeding && props.torrent.seedRatioLimit)) {
    const eta = Duration.fromObject({seconds: props.torrent.etaNulled}, {locale: 'en-Us'})

    statsString += props.torrent.etaNulled ? ` - ${eta.rescale().toHuman()} remaining` : ' - remaining time unknown'
  }

  if (props.torrent.rateDownload === 0 && props.torrent.rateUpload === 0) {
    if (props.torrent.activityDate !== 0 && props.torrent.lastActive) {
      // const now = DateTime.now().set({millisecond: 0})
      // const activity = DateTime.fromSeconds(props.torrent.activityDate)
      // const diff = now.diff(activity, "seconds", {locale: 'en-Us'})
      statsString += ` - last active ${props.torrent.lastActive.rescale().toHuman()} ago`
    } else {
      statsString += ` - never active`
    }
  }

  return statsString
})

const isSelected = computed(() => torrentListStore.selectedTorrents.includes(props.torrent.id))

const ctrlState = useKeyModifier('Control')
const commandState = useKeyModifier('Meta')
const select = () => {
  if (!ctrlState.value && !commandState.value) {
    torrentListStore.selectedTorrents = [props.torrent.id]
    return
  }

  if (!torrentListStore.selectedTorrents.includes(props.torrent.id)) {
    torrentListStore.selectedTorrents.push(props.torrent.id)
  } else {
    torrentListStore.selectedTorrents = torrentListStore.selectedTorrents.filter(item => item !== props.torrent.id)
  }
}
</script>

<template>
  <VListItem :base-color="textColor" :active="isSelected" @click="select">
    <VListItemTitle :value="props.torrent.id">
      ({{ props.torrent.queuePosition + 1 }}) {{ props.torrent.name }}
      <div class="text-sm">
        {{ status }} {{ peersStats }} {{ downloadSpeed }} {{ uploadSpeed }} <span
        v-if="showPercentage">{{ progress.toFixed(2) }}%</span>
      </div>
    </VListItemTitle>

    <VListItemSubtitle class="mt-2">
      <VProgressLinear
        height="20"
        rounded
        :model-value="progress"
        :bg-color="progressBarColor"
        :color="progressBarColor"
        :striped="progressBarStriped"
      >
      </VProgressLinear>
    </VListItemSubtitle>
    <VListItemTitle>
      <div class="text-sm mt-1 stats">
        {{ stats }}
      </div>
    </VListItemTitle>
  </VListItem>
</template>

<style scoped lang="scss">
.stats {
  white-space: break-spaces;
}
</style>
