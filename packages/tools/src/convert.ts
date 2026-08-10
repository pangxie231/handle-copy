import toSimplifiedMap from './map/toSimplified.json'
import { reversMap } from './utils'

export function toSimplified<T extends string | number | undefined>(text: T): T {
  if(!text ||  typeof text !== 'string') {
    return text
  }

  // @ts-expect-error ignore
  return text.replace(/[^\x00-\xFF]/g, s=> (s in toSimplifiedMap) ? toSimplifiedMap[s] : s)
}

let toTraditionalMap: Record<string, string> | undefined

export function toTraditional<T extends number | string | undefined>(text: T):T {
  if(!text || typeof text !== 'string') {
    return text
  }

  if(toTraditionalMap === undefined) {
    toTraditionalMap = reversMap(toSimplifiedMap)
  }

  // @ts-expect-error
  return text.replace(/[^\x00-\xFF]/g, s=> (s in toTraditionalMap) ? toTraditionalMap[s] : s)
}