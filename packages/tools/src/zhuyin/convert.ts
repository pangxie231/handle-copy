import { parsePinyin } from '../pinyin';
import zhuyinMap from '../map/zhuyin.json'
import toneSymbols from '../map/toneSymbols.json'
import { reversMap } from '../utils'
import type { ParsedPinyin } from '../types'

export function toZhuyin(pinyin: string | ParsedPinyin, renderTone = true) {
  pinyin = parsePinyin(pinyin)

  const base = (zhuyinMap as any)[pinyin.base] || (zhuyinMap as any)[pinyin.base.replace('v', 'u')]

  if(!base) {
    throw new Error(`Invalid pinyin ${pinyin.base}`)
  }

  const tone = renderTone && pinyin.tone ? toneSymbols[pinyin.tone] : ''
  return base + tone
}