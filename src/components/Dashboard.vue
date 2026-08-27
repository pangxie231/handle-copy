<script lang="ts" setup>
import DashboardItem from './DashboardItem.vue';
import { t } from '~/i18n'
import { showDashboard } from '~/state'
import { avergeDurations, gameCount, history, historyTriesCount, noHintPassedCount, passedCount, passedTries } from '~/storage'
import { checkValidIdiom } from '~/logic'
import { computed } from 'vue';

const triesMap = computed(()=> {
  const map = new Map<number, number>()
  passedTries.value.forEach((m)=> {
    let count = m.tries?.length!
    if(count > 10) {
      count = 10
    }
    map.set(count, (map.get(count) || 0) + 1)
  })
  return map
})

const triesMax = computed(()=> {
  let max = 0
  triesMap.value.keys().forEach(i=> {
    if (i > max) {
      max = i
    }
  })
  return max
})

const triesMaxCount = computed(()=> {
  let max = 1
  triesMap.value.values().forEach(i=> {
    if (i > max) {
      max = i
    }
  })
  return max
})

function close() {
  showDashboard.value = false
}

const allWords = computed(()=> Array.from(new Set(Object.values(history.value))).flatMap(m=> m.tries).filter(Boolean))
const validWords = computed(()=> allWords.value.filter(i=> checkValidIdiom(i!, true)))
</script>

<template>
  <div>

  </div>
</template>