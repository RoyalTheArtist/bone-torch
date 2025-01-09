<script setup lang="ts">
import { computed } from 'vue';

type TextInputStyles = "default"

const props = withDefaults(defineProps<{ label: string, style?: TextInputStyles }>(), {
    style: "default"
})

const labelClass = computed(() => {
    return {
        "text-default": props.style === "default"
    }
})
</script>

<template>
    <label :class="labelClass">
        {{ label }}
        <input type="text">
    </label>
</template>

<style>
    .text-default {
        input {
            display: block;
        }
    }
</style>