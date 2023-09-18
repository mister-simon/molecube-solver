<script setup>
import shuffle from '../lib/shuffle';
import permute from '../lib/permute';
import { computed, onMounted, reactive, ref } from 'vue';
import Face from './Face.vue';

const emit = defineEmits(['invalid']);

let loaded = ref(false);
let count = ref(0);
let validFaces = ref(0);

const stickerPermuter = permuteStickers();

// Centers
const centers = {
  back: { color: 'white' },
  up: { color: 'orange' },
  left: { color: 'lblue' },
  front: { color: 'black' },
  right: { color: 'dblue' },
  down: { color: 'yellow' },
}

const stickers = reactive({});

onMounted(reroll);

function getStickers(...indexes) {
  return indexes.map((index) => ({ index, sticker: stickers[index] }));
}

const faces = computed(
  () => ({
    back: getStickers(
      1, 9, 2,
      10, null, 11,
      3, 12, 4
    ),
    up: getStickers(
      3, 12, 4,
      13, null, 14,
      5, 15, 6
    ),
    left: getStickers(
      3, 13, 5,
      10, null, 16,
      1, 18, 7
    ),
    front: getStickers(
      5, 15, 6,
      16, null, 17,
      7, 19, 8
    ),
    right: getStickers(
      6, 14, 4,
      17, null, 11,
      8, 20, 2
    ),
    down: getStickers(
      7, 19, 8,
      18, null, 20,
      1, 9, 2
    ),
  })
)

function getColorCounts(face, center) {
  return face
    .map((sticker) => sticker.sticker?.color ?? center.color)
    .reduce(
      (colors, color) => {
        if (colors[color] === undefined) {
          colors[color] = 0;
        }

        colors[color]++;

        return colors;
      },
      {}
    );
}

function validateFace(face, center) {
  const colorCounts = getColorCounts(face, center);

  const notValid = Object.values(colorCounts)
    .some((count) => count > 1);

  return notValid === false;
}

const validateCube = () => {
  let failed = 0;

  for (const face of Object.keys(faces.value)) {
    const center = centers[face];
    const faceStickers = faces.value[face];

    const faceValid = validateFace(faceStickers, center);

    if (faceValid === false) {
      failed++;
    }
  }

  const isValid = failed === 0;

  if (isValid) {
    console.log(faces.value);

    alert('VALID SOLUTION!!!');
  }

  const valid = 6 - failed;

  if (valid > validFaces.value) {
    validFaces.value = valid;
    console.log(valid, faces.value);
  }


  return isValid;
}

function* permuteStickers() {
  for (const corners of permute([
    'white',
    'orange',
    'black',
    'yellow',
    'lblue',
    'dblue',
    'green',
    'green',
  ])) {
    for (const edges of permute([
      'white',
      'orange',
      'black',
      'yellow',
      'lblue',
      'dblue',
      'purple',
      'purple',
      'purple',
      'red',
      'red',
      'red',
    ])) {
      yield [
        ...corners,
        ...edges
      ];
    }
  }
}

function reroll() {
  const nextPermutation = stickerPermuter.next();

  if (nextPermutation.done) {
    return;
  }

  const shuffledStickers = nextPermutation.value;

  let i = 1;
  for (const color of shuffledStickers) {
    stickers[i++] = { color };
  }

  loaded.value = true;
  count.value++;

  const isValid = validateCube();

  if (isValid === false) {
    if (count.value % 1000 === 0) {
      setTimeout(() => requestAnimationFrame(reroll), 0);
    } else {
      reroll()
    }
  }
}

</script>

<template>
  <p class="text-center mt-4">Rerolled: {{ count }}</p>
  <p class="text-center ">Best match: {{ validFaces }} / 6</p>
  <div class="wrap" v-if="loaded">
    <div class="grid grid-cols-3 gap-[1px] p-4 max-w-[calc(100vh*0.7)] mx-auto">
      <div></div>
      <!-- Back -->
      <Face :center="{ sticker: centers.back }" :stickers="faces.back" :is-valid="validateFace(faces.back, centers.back)"
        class="back" />
      <div></div>

      <div></div>
      <!-- Up -->
      <Face :center="{ sticker: centers.up }" :stickers="faces.up" :is-valid="validateFace(faces.up, centers.up)"
        class="up" />
      <div></div>

      <!-- Left -->
      <Face :center="{ sticker: centers.left }" :stickers="faces.left" :is-valid="validateFace(faces.left, centers.left)"
        class="left" />
      <!-- Front -->
      <Face :center="{ sticker: centers.front }" :stickers="faces.front"
        :is-valid="validateFace(faces.front, centers.front)" class="front" />
      <!-- Right -->
      <Face :center="{ sticker: centers.right }" :stickers="faces.right"
        :is-valid="validateFace(faces.right, centers.right)" class="right" />

      <div></div>
      <!-- Down -->
      <Face :center="{ sticker: centers.down }" :stickers="faces.down" :is-valid="validateFace(faces.down, centers.down)"
        class="down" />
      <div></div>
    </div>
  </div>
</template>


<style scoped>
/* .wrap {
  perspective: 1000px;
  --offset: 0;
}

.grid {
  transform: rotate3d(-1, 1, 1, 45deg);
  transform-style: preserve-3d;
}

.back {
  transform: rotateY(180deg) translateZ(var(--offset));
}

.up {
  transform: rotateX(90deg) translateZ(var(--offset));
}

.left {
  transform: rotateY(-90deg) translateZ(var(--offset));
}

.front {
  transform: translateZ(var(--offset));
}

.right {
  transform: rotateY(90deg) translateZ(var(--offset));
}

.down {
  transform: rotateX(-90deg) translateZ(var(--offset));
} */
</style>
