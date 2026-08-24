<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { isDark, showDashboard, showHelp, showSettings, useMask } from '~/state'
import {  gameCount } from '~/storage'
import AppName from './AppName.vue';

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)
const toggleDashboard = useToggle(showDashboard)

function openHelp() {
  showHelp.value = true
  useMask.value = false
}
</script>
<template>
  <nav border="b base" relative>
    <div absolute font-serif text-2xl inset-0 z--1 tracking-2 flex>
      <AppName ma/>
    </div>
    <div flex items-center justify-between md:max-w-md ma py4 px2>
      <div flex gap-4>
        <button icon-btn mx2>
          <div i-carbon-help />
        </button>
        <button icon-btn mx2>
          <div i-carbon-catalog/>
        </button>
      </div>
      <div flex items-center>
        <button icon-btn mx2 @click="toggleSettings()">
          <div i-carbon-settings/>
        </button>
        <button icon-btn mx2>
          <div i-carbon-sun dark:i-carbon-moon/>
        </button>
      </div>
    </div>
  </nav>
</template>