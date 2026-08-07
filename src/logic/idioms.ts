import {  getPinyinRaw} from '@hankit/tools'
import PolyphonesRaw from '../data/polyphones.json'
import IdiomsRaw from '../data/idioms.txt?raw'

export const IdiomsList = IdiomsRaw.split('\n').map(i=> i.trim()).filter(Boolean)
export const Polyphones = PolyphonesRaw as Record<string, string>

export function getIdiom(word: string): [string, string | undefined] | undefined {
  
}