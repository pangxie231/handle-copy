import seedrandom from 'seedrandom'
import { RANDOM_SEED } from '~/logic/constant'

export function seedShuffle<T>(array: T[], seed = RANDOM_SEED): T[] {
  const rng = seedrandom(seed)
  let currentIndex = array.length
  let randomIndex

  while(currentIndex !== 0) {
    randomIndex = Math.floor(rng() * currentIndex)
    // 通常这个循环条件都是放在最后面的
    // 但是为什么放在中间呢
    // 因为currentIndex是数组的length，而数组的最后一项是length-1
    // 下面的赋值操作currentIndex没有减1，而上面的randomIndex有依赖length
    // 所以干脆在这个地方减一，这样在第一次赋值时currentIndex就不会超出数组
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array
}