<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { isDark } from '~/state';


const toggleDark = useToggle(isDark)
</script>

<template>
  <div b b-t-none b-b-solid>
    <div flex justify-between items-center max-w-90 mx-auto>
      <div flex items-center gap-4 py-4>
        <button icon-btn>
          <div i-carbon:help />
        </button>
        <button icon-btn>
          <div i-carbon-catalog />
        </button>
      </div>
      <div flex items-center gap-4 py-4>
        <button icon-btn>
          <div i-carbon:help />
        </button>
        <button icon-btn>
          <div i-carbon-catalog />
        </button>
      </div>
    </div>
  </div>
</template>
