<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    direction?: string;
    mask?: boolean;
  }>(),
  {
    modelValue: false,
    direction: "bottom",
    mask: true,
  },
);

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const containerPositionClass = computed(() => {
  if (props.mask)
    return 'bottom-0 left-0 right-0 top-0'
  switch (props.direction) {
    case 'bottom':
      return 'bottom-0 left-0 right-0'
    case 'top':
      return 'top-0 left-0 right-0'
    case 'left':
      return 'bottom-0 left-0 top-0'
    case 'right':
      return 'bottom-0 top-0 right-0'
    default:
      return ''
  }
})
</script>

<template>
  <div fixed z-40 :class="[containerPositionClass]">
    <div v-if="mask" class="bg-base inset-0 absolute" :class="modelValue ? 'opacity-50' : 'opacity-0'" @click="$emit('update:modelValue', false)"></div>
    <div class="absolute">
      <slot />
    </div>
  </div>
</template>
