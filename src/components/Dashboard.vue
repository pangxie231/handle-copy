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
  <div p5 flex="~ col items-center justify-center" relative>
    <div absolute top-4 right-4>
      <button @click="close">
        <div i-carbon-close></div>
      </button>
    </div>

    <p text-xl font-serif mb2>
      <b>{{ t('dashboard') }}</b>
    </p>

    <div v-if="passedTries.length >= 3 && triesMax">
      <p>
        {{ t('guess-dist') }}
      </p>
      <div v-for="i in triesMax" :key="i">
        <div>
          {{ i === 10 ? '10+' : i }}
        </div>
        <div>
          <div>
            {{ triesMap.get(i) }}
          </div>
        </div>
      </div>
    </div>

    <div flex="~" gap-4 py-2>
      <DashboardItem :value="gameCount" :text="t('games-count')"></DashboardItem>
      <DashboardItem :value="passedCount" :text="t('win-count')"></DashboardItem>
      <DashboardItem :value="noHintPassedCount" :text="t('win-no-hint-count')"></DashboardItem>
      <DashboardItem :value="`${Math.round(passedCount / gameCount * 100)}%`" :text="t('win-rate')"></DashboardItem>
    </div>

    <div flex="~" gap-4 py-2>
      <DashboardItem :value="allWords.length" :text="t('used-words')"></DashboardItem>
      <DashboardItem :value="`${Math.round(validWords.length / allWords.length * 100)}%`" :text="t('valid-words-rate')"></DashboardItem>

    </div>

    <div flex="~" gap-4 py-2>
      <DashboardItem :value="(historyTriesCount / gameCount).toFixed(1)" :text="t('average-tries-count')"></DashboardItem>
      <DashboardItem :value="avergeDurations || '-'" :text="t('average-durations')"></DashboardItem>
    </div>
  </div>
</template>