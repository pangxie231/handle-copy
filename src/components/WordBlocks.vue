<script lang="ts" setup>
import CharBlock, { CharDetail } from './CharBlock.vue';
import pinyin from 'pinyin';
import { computed, ref } from 'vue';
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
function parsePinYin(py: string, char: string, i: number) {
  const ret = {
    _1: '',
    _2: '',
    tone: 0,
    char,
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
  return pinyins.value.map((py: string, i)=> parsePinYin(py[0],  Array.from(props.words)[i], i))
})

const answerWords = '川纳海百'
// @ts-ignore
const answer = ref(pinyin.pinyin(answerWords, {
  style: 'TONE2'
}))
const answerDetail = computed(()=> {
  return answer.value.map((py: string, i)=> parsePinYin(py[0], Array.from(answerWords)[i],  i))
})

function testAnswer(words: CharDetail[], answers: CharDetail[]) {
  // 三种状态
  // 完全匹配，位置和内容
  // 位置不对，内部匹配
  // 无该内容

  const dismatch = {
    char: words.filter((w, i)=> w.char !== answers[i].char).map(v=> v.char),
    _1: words.filter((w, i)=> w._1 !== answers[i]._1).map(v=> v._1),
    _2: words.filter((w, i)=> w._2 !== answers[i]._2).map(v=> v._2),
    tone: words.filter((w, i)=> w.tone !== answers[i].tone).map(v=> v.tone),
  }

  function includesAndRemove(value, arr) {
    if(arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1)
      return true
    }

    return false
  }

  return words.map((w, i)=> {
    const ret = {
      char: w.char === answers[i].char ? 'exact' : includesAndRemove(answers[i].char, dismatch.char) ? 'misplaced' : 'none',
      _1: w._1 === answers[i]._1 ? 'exact' : includesAndRemove(answers[i]._1, dismatch._1) ? 'misplaced' : 'none',
      _2: w._2 === answers[i]._2 ? 'exact' : includesAndRemove(answers[i]._2, dismatch._2) ? 'misplaced' : 'none',
      tone: w.tone === answers[i].tone ? 'exact' : includesAndRemove(answers[i].tone, dismatch.tone) ? 'misplaced' : 'none',
    }

    return ret
  })
}

const ret = testAnswer(wordsDetail.value, answerDetail.value)
// console.log("🚀 ~ ret:", ret)
// debugger


</script>

<template>
<div max-w-120 mx-auto flex gap-2>
  <CharBlock v-for="(char, i) in wordsDetail" :char="char" :state="ret[i]" />
</div>

</template>