<script lang="ts" setup>
import type { MatchResult, MatchType, ParsedChar } from '~/logic';
import { inputMode, useCheckAssist } from '~/storage'
import { useMask, useNumberTone } from '~/state'
import ToneSymbol from './ToneSymbol.vue';

const props = defineProps<{
  char?: ParsedChar,
  answer?: MatchResult,
  active?: boolean
}>()

function getColor(result: MatchType) {
  switch (result) {
    case 'misplaced':
      return 'text-mis'
      break
    case 'exact':
      return 'text-primary'
      break
    case 'none':
      break
      return ''
    default:
      return ''
  }
}

</script>

<template>
  <div>
    <!-- v-if="char?.char.trim()" -->
    <template v-if="true">
      <template v-if="inputMode === 'zy'"></template>
      <template v-else>
        <div w20 h20 flex="~ col items-center justify-center" bg-gray-1 rounded>
          <div flex>
            <span :class="getColor(answer?._1!)">r</span>
            <div relative>
              <span :class="getColor(answer?._2!)">u</span>
              <ToneSymbol :class="getColor(answer?.tone!)" absolute top-0 w2 h2 :tone="2"/>
            </div>
            <span :class="getColor(answer?.tone!)">2</span>
          </div>
          <div text-3xl :class="getColor(answer?.char!)">如</div>
        </div>
      </template>

    </template>

  </div>
</template>