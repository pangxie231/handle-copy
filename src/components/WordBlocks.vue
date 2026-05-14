<script lang="ts" setup>
import CharBlock from './CharBlock.vue';
import pinyin from 'pinyin';
import { computed } from 'vue';
import { pinyinInitials, pinyinFinals } from '~/pinyin'

const props = defineProps<{
  words: string
}>()

// @ts-ignore
const pinyins = computed(()=> pinyin.pinyin(props.words, {
  style: 'TONE2'
}))
console.log("🚀 ~ pinyins:", pinyins.value)

// 得到了每个字的拼音和声调
// 通过一个方法来处理，变成声母介母韵母和声调，然后还有文字

// 传入xian3
function parsePinYin(py: string, i: number) {
  const ret = {
    _1: '',
    _2: '',
    tone: 0,
    char: Array.from(props.words)[i],
  }

  for(const initial of pinyinInitials) {

    const isMatch = py.startsWith(initial)

    if(isMatch) {
      ret._1 = initial
      ret._2 = py.split(initial)[1].slice(0, -1)
      ret.tone = Number(py.match(/\d{1}$/g)?.[0])
    }
  }

  return ret
}

const wordsDetail = computed(()=> {
  return pinyins.value.map((py: string, i)=> parsePinYin(py[0], i))
})



</script>

<template>
<div max-w-120 mx-auto flex gap-2>
  <CharBlock v-for="char in wordsDetail" :char="char" />
</div>

</template>