<script lang="ts" setup>
import {
  showCheatSheet,
  showDashboard,
  showHelp,
  showSettings
} from '~/state'
import Modal from './Modal.vue';
import Settings from './Settings.vue';
</script>

<template>
  <Modal v-model="showCheatSheet">

  </Modal>
  <Modal v-model="showSettings" direction="top">
    <Settings/>
  </Modal>
</template>