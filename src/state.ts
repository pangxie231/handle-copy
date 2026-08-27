import { refDebounced, useDark, useNow, useRafFn } from "@vueuse/core";
import { computed, ref } from "vue";
import { checkPass, isDstObserved, parseWord, testAnswer } from "./logic";
import { START_DATE, TRIES_LIMIT } from "./logic/constant";
import { meta, tries, inputMode, useNumberTone as _useNumberTone } from "./storage";

// @ts-expect-error
const now = useNow({scheduler: (cb)=> {
  setInterval(cb, 1000)
}})
export const isDark = useDark()
export const showHelp = ref(false)
export const showCheatSheet = ref(false)
export const showDashboard = ref(true)
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

export const answer = ref('声名鹊起')

const params = new URLSearchParams(window.location.search)

export const isDev = import.meta.env.DEV || params.get('dev') === 'hey'
export const daySince = refDebounced(computed(()=> {
  const adjusteNow = isDstObserved(now.value) ? new Date(+now.value + 360000) : now.value
  return Math.floor((+adjusteNow - +START_DATE) / 86400000)
}))

export const dayNo = ref(params.get('d') || daySince.value)

export const isPassed = computed(()=> meta.value.passed || (tries.value.length && checkPass(testAnswer(parseWord(tries.value[tries.value.length - 1])))));

export const isFailed = computed(()=> !isPassed.value && tries.value.length >= TRIES_LIMIT)
export const isFinished = computed(()=> isPassed.value || meta.value.answer)