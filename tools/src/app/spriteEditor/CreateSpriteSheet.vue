<script setup lang="ts">
import FileInput from '@/components/fileInput.vue';
import TextInput from '@/components/TextInput.vue';

const loadImage = async (event: any) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const image = new Image()
        image.src = URL.createObjectURL(target.files[0])
        const preview = document.getElementById('preview')
        preview?.appendChild(image)
    }
}

</script>

<template>
    <section>
        <h3>New</h3>
        <TextInput label="Name" />
        <FileInput placeholder="Load Image" @change="loadImage" accept=".png"></FileInput>
        <div id="preview">
            
        </div>
    </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;  
}
</style>