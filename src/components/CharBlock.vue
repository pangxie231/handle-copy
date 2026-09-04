<script lang="ts" setup>
import type { MatchResult, MatchType, ParsedChar } from "~/logic";
import { inputMode, useCheckAssist } from "~/storage";
import { useMask, useNumberTone } from "~/state";
import ToneSymbol from "./ToneSymbol.vue";
import { computed } from "vue";

const props = defineProps<{
  char?: ParsedChar;
  answer?: MatchResult;
  active?: boolean;
}>();

// 比较的三个维度
// 拼音的字母、声调、文字，是否全都为相等
const exact = computed(
  () => props.answer && Object.values(props.answer).every((i) => i === "exact"),
);

// 这个parsed，应该是作为对answer的一个格式化
// 因为这里有两种情况 1.正在输入 2.已经回答了
// 针对于正在输入的，那么是不会展示任何提示的辅助色的
const parsed = computed(() => {
  // 如果已经回答了，那么可以直接展示辅助色
  if (props.answer) {
    return props.answer;
  }
  // 如果没有回答，就返回空
  return;
});

function getColor(result?: MatchType, isChar = false) {
  const pre = useMask.value
    ? `bg-current ${isChar ? " !op70" : "!op40"} border border-current`
    : "";

  if (!result || exact.value) {
    return pre;
  }
  const colors = {
    exact: "text-ok",
    misplaced: "text-mis",
    none: isChar ? "op80" : "op35",
    deleted: inputMode.value === "zy" ? "op30" : "line-through op30",
  };
  // 已经回答了，但是不全对
  return `${pre} ${colors[result]}`;
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
              <ToneSymbol
                :class="getColor(answer?.tone!)"
                absolute
                top-0
                w2
                h2
                :tone="2"
              />
            </div>
            <span :class="getColor(answer?.tone!)">2</span>
          </div>
          <div text-3xl :class="getColor(answer?.char!)">如</div>
        </div>
      </template>
    </template>
  </div>
</template>
