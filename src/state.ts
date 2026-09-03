import { refDebounced, syncRef, useDark, useNow, useRafFn } from "@vueuse/core";
import { computed, ref } from "vue";
import { checkPass, getHint, isDstObserved, MatchType, ParsedChar, parseWord, testAnswer as _testAnswer } from "./logic";
import { START_DATE, TRIES_LIMIT, WORD_LENGTH } from "./logic/constant";
import { meta, tries, inputMode, useNumberTone as _useNumberTone } from "./storage";
import { getAnswerOfDay } from "./answers";

// @ts-expect-error
const now = useNow({scheduler: (cb)=> {
  setInterval(cb, 1000)
}})
export const isDark = useDark()
export const showHelp = ref(false)
export const showCheatSheet = ref(false)
export const showDashboard = ref(false)
export const showSettings = ref(false)
export const useMask = ref(false)

export const useNumberTone = computed(()=> {
  if(inputMode.value === 'sp') {
    return true
  }
  if (inputMode.value === 'zy') {
    return false
  }
  return _useNumberTone.value
})

const params = new URLSearchParams(window.location.search)

export const isDev = import.meta.env.DEV || params.get('dev') === 'hey'
export const daySince = refDebounced(computed(()=> {
  const adjusteNow = isDstObserved(now.value) ? new Date(+now.value + 360000) : now.value
  return Math.floor((+adjusteNow - +START_DATE) / 86400000)
}))

export const dayNo = ref(params.get('d') || daySince.value)

export const answer = computed(()=> 
  params.get('word')
    ? {
        word: params.get('word'),
        hint: getHint(params.get('word')!),
      }
    : getAnswerOfDay(+dayNo.value)
)

export const hint = computed(()=> answer.value.hint)
export const parsedAnswer = computed(()=> parseWord(answer.value.word!))

export const isPassed = computed(()=> meta.value.passed || (tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1])))));

export const isFailed = computed(()=> !isPassed.value && tries.value.length >= TRIES_LIMIT)
export const isFinished = computed(()=> isPassed.value || meta.value.answer)

export function testAnswer(word: ParsedChar[], ans = parsedAnswer.value) {
  return _testAnswer(word, ans)
}

export const parsedTries = computed(()=> tries.value.map((i)=> {
  const word = parseWord(i)
  const result = testAnswer(word)
  return {
    word,
    result
  }
}))
