<script lang="ts" setup>
import CharBlock from './CharBlock.vue'

</script>

<template>
  <div flex>
    <div m1 v-for="i in 4">
      <CharBlock/>
    </div>
  </div>

</template>