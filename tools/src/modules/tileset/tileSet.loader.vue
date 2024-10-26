<script setup lang="ts">
import FileInput from '@/components/fileInput.vue'

const onChange = (event) => {
    console.info(event)
}
</script>

<template>
    <section id="tileset-loader" class="flex-col">
        <h2>Tileset Info</h2>
        <header>
            <file-input placeholder="Load Tileset" @change="onChange" accept=".json,text/json" ></file-input>
        </header>
        <section class="properties">
            <h3>Details</h3>
            <label for="width">Width
                <input type="number" value="10" name="width">
            </label>
            <label for="height">Height
                <input type="number" value="10" name="height">
            </label>     
        </section>
        <div class="preview"></div>
    </section>
</template>