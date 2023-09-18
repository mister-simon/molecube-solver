<script setup>
import { computed, nextTick, watch, watchEffect } from 'vue';
import Sticker from './Sticker.vue';


const emit = defineEmits(['invalid']);

const { stickers, center } = defineProps({
  stickers: Array,
  center: Object,
  isValid: Boolean
})

</script>

<template>
  <div class="relative before:absolute before:bg-black before:-inset-1 before:-z-10 before:shadow-2xl"
    :class="center.sticker.color">
    <div class="grid grid-cols-3 relative z-10">
      <Sticker :sticker="stickers[0].sticker"></Sticker>
      <Sticker :sticker="stickers[1].sticker"></Sticker>
      <Sticker :sticker="stickers[2].sticker"></Sticker>
      <Sticker :sticker="stickers[3].sticker"></Sticker>
      <Sticker :sticker="center.sticker"><span class="mix-blend-difference text-white font-extrabold">{{ isValid ? 'valid'
        : ''
      }}</span>
      </Sticker>
      <Sticker :sticker="stickers[5].sticker"></Sticker>
      <Sticker :sticker="stickers[6].sticker"></Sticker>
      <Sticker :sticker="stickers[7].sticker"></Sticker>
      <Sticker :sticker="stickers[8].sticker"></Sticker>
    </div>
  </div>
</template>

<style scoped>
.grid {
  @apply w-full;
}

.grid>div {
  @apply aspect-square flex justify-center items-center;
}

.white::before {
  @apply shadow-slate-200;
}

.orange::before {
  @apply shadow-orange-500;
}

.lblue::before {
  @apply shadow-blue-300;
}

.black::before {
  @apply shadow-slate-800;
}

.dblue::before {
  @apply shadow-blue-700;
}

.yellow::before {
  @apply shadow-yellow-500;
}

.purple::before {
  @apply shadow-purple-500;
}

.red::before {
  @apply shadow-red-500;
}

.green::before {
  @apply shadow-green-500;
}
</style>
