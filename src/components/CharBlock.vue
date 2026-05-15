<script setup lang="ts">
import ToneSymbol from './ToneSymbol.vue';


export interface CharDetail {
  _1: string
  _2: string
  char: string
  tone: number
}

const props = defineProps<{
  char: CharDetail
}>()
// 声调
// 生母
// 韵母
// 汉字
// 传入一个正确的汉字，以及作答的汉字
// 通过一个方法去寻找对应汉字的声母韵母和声调
// 然后进行比较

// export interface Char {
  
// }

// 接收一个题目成语，进行展示
// 通过这个成语，去获取CharDetails这个数据
// 首先通过pinyin获取pinyins


</script>

<template>
  <div w20 h20 b-2 b-solid b-hex-f5f5f6 flex flex-col justify-center items-center>
    <div class="leading-[1]" flex relative>
      <span>{{ char._1 }}</span>
      <div flex relative>
        <ToneSymbol :tone="char.tone" absolute w8px h8px top--4px />
        <span>{{ char._2 }}</span>
      </div>
    </div>
    <div text-30px>
      {{ char.char }}
    </div>
  </div>
</template>