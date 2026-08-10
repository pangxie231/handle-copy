import seedrandom from "seedrandom";
import { WORD_LENGTH } from "./constant";

export function getHint(word: string) {
  return Math.floor(seedrandom(word)() * WORD_LENGTH)
}