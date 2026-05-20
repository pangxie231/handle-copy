<script lang="ts" setup>
import CharBlock, { CharDetail } from "./CharBlock.vue";
import pinyin from "pinyin";
import { computed, ref } from "vue";
import { pinyinInitials, pinyinFinals } from "~/pinyin";
import { WORD_LENGTH } from "~/logic";
import { answer } from "~/state";

const props = defineProps<{
  word: string;
  revealed?: boolean;
}>();

const answerPY = ref(
  // @ts-ignore
  pinyin.pinyin(answer.value, {
    style: "TONE2",
  }),
);
const answerDetail = computed(() => {
  return answerPY.value.map((py: string, i) =>
    parsePinYin(py[0], Array.from(answer.value)[i], i),
  );
});

const pinyins = computed(() =>
// @ts-ignore
  pinyin.pinyin(props.word, {
    style: "TONE2",
  }),
);

const wordsDetail = computed(() => {
  return pinyins.value.map((py: string, i) =>
    parsePinYin(py[0], Array.from(props.word)[i], i),
  );
});

// 得到了每个字的拼音和声调
// 通过一个方法来处理，变成声母介母韵母和声调，然后还有文字
// 传入xian3
function parsePinYin(py: string, char: string, i: number) {
  const ret = {
    _1: "",
    _2: "",
    tone: 0,
    char,
  };

  for (const initial of pinyinInitials) {
    const isMatch = py.startsWith(initial);

    if (isMatch) {
      ret._1 = initial;
      ret._2 = py.split(initial)[1].slice(0, -1);
      ret.tone = Number(py.match(/\d{1}$/g)?.[0]);
    }
  }
  return ret;
}

function testAnswer(words: CharDetail[], answers: CharDetail[]) {
  // 三种状态
  // 完全匹配，位置和内容
  // 位置不对，内部匹配
  // 无该内容

  if(!props.revealed) {
    return {
      char: 'none',
      _1: 'none',
      _2: 'none',
      tone: 'none',
    }
  }

  const dismatch = {
    char: words.filter((w, i) => w.char !== answers?.[i]?.char)?.map((v) => v.char),
    _1: words.filter((w, i) => w._1 !== answers?.[i]?._1).map((v) => v._1),
    _2: words.filter((w, i) => w._2 !== answers?.[i]?._2).map((v) => v._2),
    tone: words.filter((w, i) => w.tone !== answers?.[i]?.tone).map((v) => v.tone),
  };

  function includesAndRemove(value, arr) {
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
      return true;
    }

    return false;
  }

  return words.map((w, i) => {
    const ret = {
      char:
        w.char === answers[i].char
          ? "exact"
          : includesAndRemove(answers[i].char, dismatch.char)
            ? "misplaced"
            : "none",
      _1:
        w._1 === answers[i]._1
          ? "exact"
          : includesAndRemove(answers[i]._1, dismatch._1)
            ? "misplaced"
            : "none",
      _2:
        w._2 === answers[i]._2
          ? "exact"
          : includesAndRemove(answers[i]._2, dismatch._2)
            ? "misplaced"
            : "none",
      tone:
        w.tone === answers[i].tone
          ? "exact"
          : includesAndRemove(answers[i].tone, dismatch.tone)
            ? "misplaced"
            : "none",
    };

    return ret;
  });
}

const ret = testAnswer(answerDetail.value, wordsDetail.value);

// 通过revealed是否揭晓
// 最后会影响样式的应用
</script>

<template>
  <div flex gap-2>
    <!-- <template v-if="wordsDetail?.length"> -->
    <CharBlock
      v-for="(w, i) in 4"
      :key="i"
      :char="wordsDetail?.[i]"
      :state="ret[i]"
      :revealed="props.revealed"
    />

    <!-- </template> -->
  </div>
</template>
