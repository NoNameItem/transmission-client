<script lang="ts" setup>
import { themeConfig } from '@themeConfig'

// Components
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import { HorizontalNavLayout } from '@layouts'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { useSessionStore } from '@/stores/session'
import NavbarMenu from '@/layouts/components/NavbarMenu.vue'
import { useTorrentListStore } from '@/stores/torrentList'

// SECTION: Loading Indicator
const isFallbackStateActive = ref(false)
const refLoadingIndicator = ref<any>(null)

// watching if the fallback state is active and the refLoadingIndicator component is available
watch([isFallbackStateActive, refLoadingIndicator], () => {
  if (isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.fallbackHandle()

  if (!isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.resolveHandle()
}, { immediate: true })
// !SECTION

const sessionStats = useSessionStore()
const torrentListStore = useTorrentListStore()

sessionStats.fetchSessionStats()
</script>

<template>
  <HorizontalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar>
      <div class="app-logo d-flex align-center gap-x-3">
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          {{ themeConfig.app.title }}
        </h1>
        <span
          v-if="sessionStats.loaded"
          class="text-lg d-none d-sm-inline-block"
        ><VIcon icon="tabler-arrow-narrow-down" /> {{ torrentListStore.downloadCount }} : {{ sessionStats.downloadSpeed }}</span>
        <span
          v-if="sessionStats.loaded"
          class="text-lg d-none d-sm-inline-block"
        ><VIcon icon="tabler-arrow-narrow-up" /> {{ torrentListStore.uploadCount }} : {{ sessionStats.uploadSpeed }}</span>
        <span
          v-if="sessionStats.loaded"
          class="text-lg d-none d-md-inline-block"
        >Active {{ sessionStats.activeTorrents }} of {{ sessionStats.allTorrents }} torrents</span>
      </div>
      <VSpacer />

      <NavbarThemeSwitcher class="me-2" />
      <NavbarMenu />
    </template>

    <AppLoadingIndicator ref="refLoadingIndicator" />

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Suspense
        :timeout="0"
        @fallback="isFallbackStateActive = true"
        @resolve="isFallbackStateActive = false"
      >
        <Component :is="Component" />
      </Suspense>
    </RouterView>

    <!-- 👉 Footer -->
  </HorizontalNavLayout>
</template>
