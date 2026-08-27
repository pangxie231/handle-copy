<script lang="ts" setup>
defineProps<{
  text: string
  value: string | number
}>()
</script>

<template>
  <div flex="~ col items-center">
    <div>
      {{ value }}
    </div>
    <div>
      {{ text }}
    </div>
  </div>
</template>