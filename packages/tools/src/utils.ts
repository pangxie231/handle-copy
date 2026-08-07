export function reversMap<K extends string | number, V extends string | number>(dict: Record<K, V>): Record<V, K> {
  const result: Record<any, any> = {}

  for(const [k, v] of Object.entries(dict) as any[]) {
    result[v] = k
  }

  return result
}