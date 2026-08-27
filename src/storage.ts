import { useStorage } from "@vueuse/core";
import { preferZhuyin, t } from "./i18n";
import { dayNo } from './state'
import type { InputMode, TriesMeta } from './logic'
import { computed } from "vue";
import { SpMode } from "@hankit/tools";


export const legacyTries = useStorage<Record<number, string[]>>('handle-tries', {})
export const history = useStorage<Record<number, TriesMeta>>('handle-tries-meta', {})
export const initialized = useStorage('handle-initialized', false)
export const inputMode = useStorage<InputMode>('handle-mode', preferZhuyin ? 'zy' : 'py')
export const spMode = useStorage<SpMode>('handle-sp-mode', 'sougou')
export const colorblind = useStorage('handle-colorblind', false)
export const useNoHint = useStorage('handle-hard-mode', false)
export const useNumberTone = useStorage('handle-number-tone', false)
export const useCheckAssist = useStorage('handle-check-assist', false)
export const useStrictMode = useStorage('handle-strict', false)
export const acceptCollecting = useStorage('handle-accept-collecting', true)

export const meta = computed<TriesMeta>({
  get() {
    if (!(dayNo.value in history.value)) {
      // @ts-expect-error
      history.value[dayNo.value] = {}
    }

    // @ts-expect-error
    return history.value[dayNo.value]
  },
  set(v) {
    // @ts-expect-error
    history.value[dayNo.value] = v
  }
})

export const tries = computed<string[]>({
  get() {
    if (!meta.value.tries) {
      meta.value.tries = []
    }
    return legacyTries.value[dayNo.value] || meta.value.tries
  },
  set(v) {
    meta.value.tries = v
  }
})

export function markStart() {
  if (meta.value.end) {
    return
  }

  if (!meta.value.start) {
    meta.value.start = Date.now()
  }
}

export function markEnd() {
  if (meta.value.end) {
    return
  }
  if (!meta.value.duration) { } {
    meta.value.duration = 0
  }

  meta.value.end = Date.now()
  if (meta.value.start) {
    meta.value.duration += meta.value.end - meta.value.start
  }
}

export function pauseTimer() {
  if (meta.value.end) {
    return
  }

  if (!meta.value.duration) {
    meta.value.duration = 0
  }

  if (meta.value.start) {
    meta.value.duration += Date.now() - meta.value.start
    meta.value.start = undefined
  }
}

export const gameCount = computed(() => Object.values(history.value).filter(m => m.passed || m.answer || m.failed).length)
export const passedTries = computed(()=> Object.values(history.value).filter(m=> m.passed))
export const noHintPassedCount = computed(()=> Object.values(history.value).filter(m=> !m.hint && m.passed).length)
export const passedCount = computed(()=> passTries.value.length)
export const historyTriesCount = computed(()=> Object.values(history.value).filter(m=> m.passed || m.failed || m.answer).map(m=> m.tries?.length || 0).reduce((a,b)=> a + b))

export const triesCount = computed(()=> tries.value.length)
export const avergeDurations = computed(() => {
  const items = Object.values(history.value).filter(m => m.passed && m.duration)
  if (!items.length) {
    return 0
  }

  const durations = items.map(m => m.duration!).reduce((a, b) => a + b, 0)
  return formatDuration(durations / items.length)
})

function formatDuration(duration: number) {
  const ts = duration / 1000
  const m = Math.floor(ts / 60)
  const s = Math.floor(ts % 60)

  if (m) {
    return `${m}${t('minutes')}${s}${t('seconds')}`
  }

  return `${s}${t('seconds')}`
}