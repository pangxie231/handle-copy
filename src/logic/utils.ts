import seedrandom from "seedrandom";
import { WORD_LENGTH } from "./constant";
import { SpMode } from '@hankit/tools'
import { InputMode, ParsedChar } from './types'
import { getPinyin } from './idioms'

export function getHint(word: string) {
  return Math.floor(seedrandom(word)() * WORD_LENGTH)
}

export function parsePinyiin(pinyin: string, mode: InputMode = 'py', spMode: SpMode = 'sougou') {
  
}

export function parseChar(char: string, pinyin?: string, mode?: InputMode, spMode: SpMode): ParsedChar {

}

export function parseWord(word: string, answer?: string, mode?: InputMode, spMode?: SpMode) {

}

// 检查是否处于夏令时
// daylight saving time
export function isDstObserved(date: Date) {
  const jan = new Date(date.getFullYear(), 0, 1)
  const jul = new Date(date.getFullYear(), 6, 1)
  const standardTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  return date.getTimezoneOffset() < standardTimezoneOffset
}