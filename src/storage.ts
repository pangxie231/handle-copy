import { useStorage } from "@vueuse/core";
import { preferZhuyin, t } from "./i18n";
import { dayNo } from './state'
import type { TriesMeta } from './logic'
import { computed } from "vue";


export const legacyTries = useStorage<Record<number, string[]>>('handle-tries', {})
export const history = useStorage<Record<number, TriesMeta>>('handle-tries-meta', {})
export const initialized = useStorage('handle-initialized', false)
export const colorblind = useStorage('handle-colorblind', false)

export const meta = computed<TriesMeta>({
  get() {
    if(!(dayNo.value in history.value)) {
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
    if(!meta.value.tries) {
      meta.value.tries = []
    }
    return legacyTries.value[dayNo.value] || meta.value.tries
  },
  set(v) {
    meta.value.tries = v
  }
})

export function markStart() {
  if(meta.value.end) {
    return
  }

  if(!meta.value.start) {
    meta.value.start = Date.now()
  }
}

export function markEnd() {
  if(meta.value.end) {
    return
  }
  if(!meta.value.duration) {} {
    meta.value.duration = 0
  }

  meta.value.end = Date.now()
  if(meta.value.start) {
    meta.value.duration += meta.value.end - meta.value.start
  }
}

export function pauseTimer() {
  if(meta.value.end) {
    return
  }

  if(!meta.value.duration) {
    meta.value.duration = 0
  }

  if(meta.value.start) {
    meta.value.duration += Date.now() - meta.value.start
    meta.value.start = undefined
  }
}