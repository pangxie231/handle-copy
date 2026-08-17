import { initialized, markEnd, markStart, meta, pauseTimer } from './storage'
import {answer, dayNo, daySince, isDev, isFinished, isPassed, showCheatSheet, showHelp} from './state'
import { t } from './i18n'
import { answers } from './answers/list'
import { START_DATE } from './logic/constant'
import { useDocumentVisibility, useTitle } from '@vueuse/core'
import { computed, watch, watchEffect } from 'vue'

useTitle(computed(()=> `${t('name')} - ${t('description')}`))

if(!initialized.value) {
  showHelp.value = true
}

watchEffect(()=> {
  if(isPassed.value) {
    meta.value.passed = true
  }
})

watch(daySince, (n, o)=> {
  if(o === dayNo.value && isFinished.value) {
    dayNo.value = n
  }
})

watch([isFinished, meta], ()=> {
  if(isFinished.value) {
    markEnd()
  }
}, { flush: 'post' })

watch(isFinished, (v)=> {
  if(v) {
    showCheatSheet.value = true
  }
}, { flush: 'post' })

const visible = useDocumentVisibility()

let leaveTime = 0
const REFRESH_TIME = 1000 * 60 * 60 * 3 // 3 hours
watchEffect(()=> {
  
})
