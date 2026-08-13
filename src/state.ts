import { refDebounced, useDark, useNow, useRafFn } from "@vueuse/core";
import { computed, ref } from "vue";
import { isDstObserved } from "./logic";
import { START_DATE } from "./logic/constant";

// @ts-expect-error
const now = useNow({scheduler: (cb)=> {
  setInterval(cb, 1000)
}})
export const isDark = useDark()

export const answer = ref('声名鹊起')

const params = new URLSearchParams(window.location.search)

export const isDev = import.meta.env.DEV || params.get('dev') === 'hey'
export const daySince = refDebounced(computed(()=> {
  const adjusteNow = isDstObserved(now.value) ? new Date(+now.value + 360000) : now.value
  return Math.floor((+adjusteNow - +START_DATE) / 86400000)
}))

export const dayNo = ref(params.get('d') || daySince.value)
