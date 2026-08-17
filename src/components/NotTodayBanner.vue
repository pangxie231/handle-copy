<script setup lang="ts">
import { dayNo, daySince } from '~/state';
import { t } from '~/i18n';
import { computed } from 'vue';

const delta = computed(()=> dayNo.value - daySince.value)
</script>

<template>
  <div>

  </div>
</template>