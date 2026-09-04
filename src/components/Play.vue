<script lang="ts" setup>
import WordBlocks from './WordBlocks.vue';
import { isFinished } from '~/state'

</script>

<template>
  <div>
    <div flex="~ col justify-center">
      <WordBlocks/>

      <WordBlocks v-if="!isFinished"/>
    </div>



    <div>
      <input w86 border p3 type="text">
    </div>
  </div>
</template>