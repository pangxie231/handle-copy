<script lang="ts" setup>
defineProps<{
  text: string
  value: string | number
}>()
</script>

<template>
  <div>
    <div>
      {{ value }}
    </div>
    <div>
      {{ text }}
    </div>
  </div>
</template>