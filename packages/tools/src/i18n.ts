import hans from './locales/zh-cn.json'
import hant from './locales/zh-tw.json'

const lang = window.navigator.language.toLowerCase() || ''
export const preferTraditional = lang.includes('hant') || lang.includes('tw') || lang.includes('hk')
export const preferZhuyin = lang.includes('tw')
