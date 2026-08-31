<script setup lang="ts">
import { getShuangConstants, pinyinFinals, pinyinInitials, zhuyinSymbols } from '@hankit/tools'
import { inputMode, spMode } from '~/storage'
import { t } from "~/i18n";
import { showCheatSheet } from '~/state'
</script>
<template>
  <div relative p8 pt4>
    <button absolute top-4 right-4>
      <div i-carbon-close></div>
    </button>
    <p>{{ t("cheatsheet") }}</p>

    <div flex="~ items-start">
      <div px4>
        <p>{{ t("initials") }}</p>
        <div grid="~ cols-4" gap1>
          <span v-for="i in 26">{{ 1 }}</span>
        </div>
      </div>
      <div px4>
        <p>{{ t('finals') }}</p>
        <div grid="~ cols-4" gap1>
          <span v-for="i in 26">{{ 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
