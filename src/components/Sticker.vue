<script setup>

defineProps({
    sticker: Object
})
</script>

<template>
    <div :class="sticker.color" class="transition-colors duration-200">
        <slot></slot>
    </div>
</template>

<style scoped>
.grid>div {
    @apply aspect-square flex justify-center items-center;
}

.white {
    @apply bg-slate-200;
}

.orange {
    @apply bg-orange-500;
}

.lblue {
    @apply bg-blue-300;
}

.black {
    @apply bg-slate-800;
}

.dblue {
    @apply bg-blue-700;
}

.yellow {
    @apply bg-yellow-500;
}

.purple {
    @apply bg-purple-500;
}

.red {
    @apply bg-red-500;
}

.green {
    @apply bg-green-500;
}
</style>
