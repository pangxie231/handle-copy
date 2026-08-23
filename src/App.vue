<script setup lang="ts">
import '~/init'
import { answer, dayNo, daySince, isDev } from '~/state'
import { colorblind } from '~/storage'
import { DAYS_PLAY_BACK } from '~/logic/constant'
import { useWindowSize } from '@vueuse/core'
import { watchEffect } from 'vue'
import NotTodayBanner from './components/NotTodayBanner.vue'
import Navbar from './components/Navbar.vue'
import Modal from './components/Modal.vue'

const { height } = useWindowSize()

watchEffect(()=> {
  document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
})
</script>

<template>
  <main>
    <!-- <NotTodayBanner/> -->
    <Navbar/>
    <Modal>
      wsnd
    </Modal>
  </main>
</template>
