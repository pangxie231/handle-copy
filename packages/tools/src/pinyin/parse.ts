import type { ParsedPinyin } from '../types'
import _phonetics from '../map/phonetics.json'

const phonetics = _phonetics as Record<string, string>

export function parsePinyin(pinyin: string | ParsedPinyin): ParsedPinyin {
  
}