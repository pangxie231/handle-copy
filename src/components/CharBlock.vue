<script setup lang="ts">
import { computed } from "vue";
import ToneSymbol from "./ToneSymbol.vue";

export interface CharDetail {
  _1: string;
  _2: string;
  char: string;
  tone: number;
}

const props = defineProps<{
  char: Partial<CharDetail>;
  state: {
    [k in keyof CharDetail]: "exact" | "misplaced" | "none";
  };
  revealed?: boolean
}>();


// 如果字符正确那就全部正确，控制背景
// 否则字符 位置正确
// 声母韵母 正确/位置正确
// 音调 正确/位置正确

function getStyles(
  stateLabel: "exact" | "misplaced" | "none",
  isChar: boolean = false,
) {
  if(isCharExact.value || !props.revealed) return ''

  return {
    exact: "text-ok",
    misplaced: "text-mis",
    none: "",
  }[stateLabel];
}


const isCharExact = computed(()=> props.state?.char === 'exact')


// 接收一个题目成语，进行展示
// 通过这个成语，去获取CharDetails这个数据
// 首先通过pinyin获取pinyins
</script>

<template>
  <div
    w20
    h20
    b-2
    b-solid
    b-hex-f5f5f6
    flex
    flex-col
    justify-center
    items-center
    :class="(isCharExact && revealed) ? 'bg-ok text-hex-fff' : ''"
  >
    <div class="leading-[1]" flex relative>
      <span :class="getStyles(state?._1)">{{ char?._1 }}</span>
      <div flex relative>
        <ToneSymbol
          :class="getStyles(state?.tone)"
          :tone="char?.tone"
          absolute
          w8px
          h8px
          top--4px
        />
        <span :class="getStyles(state?._2)">{{ char?._2 }}</span>
      </div>
    </div>
    <div text-30px :class="getStyles(state?.char)">
      {{ char?.char }}
    </div>
  </div>
</template>
