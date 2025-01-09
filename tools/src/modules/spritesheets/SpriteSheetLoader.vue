<script setup lang="ts">
import FileInput from '@/components/fileInput.vue';
import { getFileInputAs } from '@/utils/files';
import { AssetManager } from 'bt-engine/assets/assets.manager';
import type { ISpriteSheetData, SpriteSheet } from 'bt-engine/graphics';


const allSpritesheets = new Map<string, SpriteSheet>()

async function loadTileSet(spritesheet: ISpriteSheetData) {
    if (allSpritesheets.has(spritesheet.meta.resource)) {
        return allSpritesheets.get(spritesheet.meta.resource)
    }

    const sheet = await loadSpritesheet(spritesheet as ISpriteSheetData)
    if (!sheet) throw new Error('Sheet not found')
    
    // const tileSet = new TileSet(sheet, tiles.meta)
    // for (const key in tiles.tiles) {
    //     tileSet.addTile(key, tiles.tiles[key])
    // }
    // allTileSets.set(tiles.meta.resource, tileSet)
    // return tileSet
}

async function loadSpritesheet(spritesheet: ISpriteSheetData) {
    if (allSpritesheets.has(spritesheet.meta.resource)) {
        return allSpritesheets.get(spritesheet.meta.resource)
    }

    const texture = await loadTexture(spritesheet.meta.resource)
    const sheet = new SpriteSheet(texture, spritesheet.atlas)
    sheet.process()
    allSpritesheets.set(spritesheet.resource, sheet)
    return sheet
}


const handleLoad = async (elem: HTMLInputElement) => {
    const tileSetData = await getFileInputAs(elem);
    return tileSetData
}

const onChange = async (event: Event) => {
    console.info(event)
    const load = await handleLoad(event.target as HTMLInputElement)
    console.log(load)
    const spriteSheet = await AssetManager.loadSpritesheet(load.value.spritesheet.resource)

    const preview = document.getElementById('preview')
    preview?.appendChild(spriteSheet.texture.image as HTMLImageElement)
}

</script>

<template>
    <h3>Load Spritesheet</h3>
    <FileInput placeholder="Load Spritesheet" @change="onChange" accept=".json,text/json"></FileInput>
    <div id="preview"></div>
</template>