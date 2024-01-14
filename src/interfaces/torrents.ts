import type { Duration } from '@fullcalendar/core'

export enum TorrentStatus {
  Stopped,
  QueuedToVerify,
  Verifying,
  QueuedToDownload,
  Downloading,
  QueuedToSeed,
  Seeding,
}

export const getStatusName = (status: TorrentStatus) => {
  switch (status) {
    case TorrentStatus.Stopped:
      return 'Stopped'
    case TorrentStatus.QueuedToVerify:
      return 'Queued to verify'
    case TorrentStatus.Verifying:
      return 'Verifying'
    case TorrentStatus.QueuedToDownload:
      return 'Queued to download'
    case TorrentStatus.Downloading:
      return 'Downloading'
    case TorrentStatus.QueuedToSeed:
      return 'Queued to seed'
    case TorrentStatus.Seeding:
      return 'Seeding'
    default:
      return 'Unknown status'
  }
}

export interface TorrentListInfo {
  activityDate: number
  addedDate: number
  lastActive?: Duration
  downloadedEver: number
  error: number
  errorString: string
  eta: number
  etaNulled?: number
  etaIdle: number
  id: number
  name: string
  peersConnected: number
  peersGettingFromUs: number
  peersSendingToUs: number
  percentDone: number
  queuePosition: number
  rateDownload: number
  rateUpload: number
  recheckProgress: number
  sizeWhenDone: number
  status: TorrentStatus
  totalSize: number
  uploadRatio: number
  seedRatioLimit: number
  uploadedEver: number
}
