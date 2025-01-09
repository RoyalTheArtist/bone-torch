<script setup lang="ts">
import { getFileInputAs } from '@/utils/files';
import { ref, useTemplateRef } from 'vue'

defineOptions({
    inheritAttrs: false
})

interface IFileInput {
    label?: string
}

defineProps<IFileInput>()


const loadTiles = useTemplateRef('loadTiles')

const onBrowse = () => {
    loadTiles.value?.click()
}

const file = ref(null as File | null)

const onChange = async (event: Event) => {
    const load = await handleLoad(event.target as HTMLInputElement)
    file.value = load.file
    console.log(load)
}

const handleLoad = async (elem: HTMLInputElement) => {
    const tileSetData = await getFileInputAs(elem);
    return tileSetData
}
</script>

<template>
    <slot name="activator" @click="onBrowse">
      
    </slot>
    <label for="input-file">
        <input type="text" name="input-file" readonly :value="file?.name" :placeholder="`${$attrs['placeholder'] || ''}`" @click="onBrowse">
    </label>
    <input type="file" ref="loadTiles" class="display-none" :accept="`${$attrs['accept']}`" @change="$attrs.onChange">
   
</template>

<style scoped>
    input[readonly] {
        outline: none;
        cursor: pointer;
        border: none;
    }
</style>