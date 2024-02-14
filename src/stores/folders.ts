export const useFoldersStore = defineStore(
  'folders',
  () => {
    const folders: Ref<string[]> = ref(['test', 'test 2', 'test 3'])

    const addFolder = (folder: string) => {
      if (folder && !folders.value.includes(folder))
        folders.value = [...folders.value, folder].sort()
    }

    return {
      folders,
      addFolder,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['folders'],
    },
  },
)
