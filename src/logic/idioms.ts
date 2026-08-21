import { getPinyinRaw} from '@hankit/tools'
import PolyphonesRaw from '../data/polyphones.json'
import IdiomsRaw from '../data/idioms.txt?raw'
import { toSimplified } from '@hankit/tools'

export const IdiomsList = IdiomsRaw.split('\n').map(i=> i.trim()).filter(Boolean)
export const Polyphones = PolyphonesRaw as Record<string, string>

export function getIdiom(word: string): [string, string | undefined] | undefined {
  const simplified = toSimplified(word)
  if(Polyphones[word]) {
    return [word, Polyphones[word]]
  }
  if(Polyphones[simplified]) {
    return [simplified, Polyphones[simplified]]
  }
  if(IdiomsList.includes(word)) {
    return [word, undefined]
  }
  if(IdiomsList.includes(simplified)) {
    return [simplified, undefined]
  }

  return undefined
}

export function getPinyin(word: string) {
  const data = getIdiom(word)
  const parts = data?.[1] ? data[1].split(/\s+/g) : getPinyinRaw(data?.[0] || toSimplified(word), { style: getPinyinRaw.STYLE_TONE2}).map(i=> i[0])

  return parts
}