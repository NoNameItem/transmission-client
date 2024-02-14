<script setup lang="ts">
import { DxList } from 'devextreme-vue/list'
import { useFoldersStore } from '@/stores/folders'

const visible = ref(false)
const folder = ref('')
const listRef = ref()

const foldersStore = useFoldersStore()

const addFolder = () => {
  foldersStore.addFolder(folder.value)
  folder.value = ''
}
</script>

<template>
  <VDialog
    v-model="visible"
    activator="parent"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
  >
    <div>
      <VToolbar color="primary">
        <VBtn
          icon
          variant="plain"
          @click="visible = false"
        >
          <VIcon
            color="white"
            icon="tabler-x"
          />
        </VBtn>
        <VCardText>
          <VToolbarTitle>Folders</VToolbarTitle>
        </VCardText>
        <VSpacer />
      </VToolbar>
    </div>
    <VCard>
      <VCardText>
        <VTextField
          v-model="folder"
          variant="outlined"
          type="text"
          label="Add folder"
          append-inner-icon="tabler-plus"
          @click:append-inner="addFolder"
        />
        <div class="dx-viewport">
          <DxList
            :ref="listRef"
            :data-source="foldersStore.folders"
            :allow-item-deleting="true"
            item-delete-mode="toggle"
          />
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.table-wrap {
  height: 100vh;
}
</style>
