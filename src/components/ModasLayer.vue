<script lang="ts" setup>
import {
  showCheatSheet,
  showDashboard,
  showHelp,
  showSettings
} from '~/state'
import Modal from './Modal.vue';
import Settings from './Settings.vue';
import Dashboard from './Dashboard.vue';
import CheatSheet from './CheatSheet.vue';

</script>

<template>
  <Modal v-model="showCheatSheet" direction="right">
    <!-- <CheatSheet/> -->
  </Modal>
  <Modal v-model="showSettings" direction="top">
    <Settings/>
  </Modal>
  <Modal v-model="showDashboard" direction="top">
    <Dashboard/>
  </Modal>
</template>