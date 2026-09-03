<script setup lang="ts">
import '~/init'
import { answer, dayNo, daySince, isDev } from '~/state'
import { colorblind } from '~/storage'
import { DAYS_PLAY_BACK } from '~/logic/constant'
import { useWindowSize } from '@vueuse/core'
import { ref, watchEffect } from 'vue'
import NotTodayBanner from './components/NotTodayBanner.vue'
import Navbar from './components/Navbar.vue'
import ModasLayer from './components/ModasLayer.vue'
import CharBlock from './components/CharBlock.vue'

const { height } = useWindowSize()

watchEffect(()=> {
  document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
})

</script>

<template>
  <main text-center>
    <!-- <NotTodayBanner/> -->
    <Navbar/>
    <ModasLayer/>
    <CharBlock :answer="{
      char: 'exact',
      _1: 'exact',
      _2: 'exact',
      _3: 'exact',
      tone: 'exact'
    }"></CharBlock>
  </main>
</template>
