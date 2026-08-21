import seedrandom from "seedrandom";
import { WORD_LENGTH } from "./constant";
import { pinyinInitials, SpMode, toShuangpin, toZhuyin } from '@hankit/tools'
import type { InputMode, ParsedChar, MatchResult } from './types'
import { getPinyin } from './idioms'
import { toSimplified } from "@hankit/tools";

export function getHint(word: string) {
  return Math.floor(seedrandom(word)() * WORD_LENGTH)
}

export function parsePinyiin(pinyin: string, mode: InputMode = 'py', spMode: SpMode = 'sougou') {
  let parts: string[] = []
  if (pinyin) {
    if (mode === 'zy') {
      parts = Array.from(pinyin.trim() ? toZhuyin(pinyin) : '')
    } else if (mode === 'sp') {
      parts = Array.from(toShuangpin(pinyin, spMode))
    } else {
      let rest = pinyin
      const one = pinyinInitials.find(i => rest.startsWith(i))
      if (one) {
        rest = rest.slice(one.length)
      }
      parts = [one, rest].filter(Boolean) as string[]
    }
  }

  return parts
}

export function parseChar(char: string, pinyin?: string, mode?: InputMode, spMode?: SpMode): ParsedChar {
  if (!pinyin) {
    pinyin = getPinyin(char)[0]
  }
  const tone = pinyin.match(/[\d]$/)?.[0] || ''
  if (tone) {
    pinyin = pinyin.slice(0, -tone.length).trim()
  }

  const parts = parsePinyiin(pinyin, mode, spMode)

  if (parts[0] && !parts[1]) {
    parts[1] = parts[0]
    parts[0] = ''
  }

  const [one, two, three] = parts

  return {
    char,
    _1: one,
    _2: two,
    _3: three,
    parts,
    yin: pinyin,
    tone: +tone || 0
  }
}

export function parseWord(word: string, answer?: string, mode?: InputMode, spMode?: SpMode) {
  const pinyins = getPinyin(word)
  const chars = Array.from(word)
  const answerPinyin = answer ? getPinyin(answer) : undefined

  return chars.map((char, i): ParsedChar => {
    let pinyin = pinyins[i]
    if (answerPinyin && answer && answer.includes(char)) {
      pinyin = answerPinyin[answer.indexOf(char)] || pinyin
    }
    return parseChar(char, pinyin, mode, spMode)
  })
}

export function testAnswer(input: ParsedChar[], answer: ParsedChar[]) {
  // 把完全匹配的字符、声调、拼音字母过滤掉
  // 剩下的就是不匹配
  const unmatched = {
    char: answer.map((a, i) => {
      return toSimplified(input[i].char) === toSimplified(a.char) ? undefined : toSimplified(a.char)
    }).filter(i => i != null),
    tone: answer.map((a, i) => {
      return input[i].tone === a.tone ? undefined : a.tone
    }).filter(i => i != null),
    parts: answer.flatMap((a, i) => {
      return a.parts.filter(p => input[i].parts.includes(p))
    })
      .filter(i => i != null) as string[]
  }

  function includesAndRemove<T>(arr: T[], v: T) {
    if (arr.includes(v)) {
      arr.splice(arr.indexOf(v), 1)
      return true
    }
    return false
  }

  return input.map((a, i): MatchResult => {
    const char = toSimplified(a.char)
    return {
      char: answer[i].char === char || answer[i].char === a.char
        ? 'exact'
        : includesAndRemove(unmatched.char, char)
          ? 'misplaced'
          : 'none',
      tone: answer[i].tone === a.tone
        ? 'exact'
        : includesAndRemove(unmatched.tone, a.tone)
          ? 'misplaced'
          : 'none',
      _1: !a._1 || answer[i].parts.includes(a._1)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._1)
          ? 'misplaced'
          : 'none',
      _2: !a._2 || answer[i].parts.includes(a._2)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._2)
          ? 'misplaced'
          : 'none',
      _3: !a._3 || answer[i].parts.includes(a._3)
        ? 'exact'
        : includesAndRemove(unmatched.parts, a._3)
          ? 'misplaced'
          : 'none',
    }
  })
}

export function checkPass(result: MatchResult[]) {
  return result.every(r=> r.char === 'exact')

}

// 检查是否处于夏令时
// daylight saving time
export function isDstObserved(date: Date) {
  const jan = new Date(date.getFullYear(), 0, 1)
  const jul = new Date(date.getFullYear(), 6, 1)
  const standardTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  return date.getTimezoneOffset() < standardTimezoneOffset
}