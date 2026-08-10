import seedrandom from "seedrandom";
import { getHint } from '../logic/index'
import { answers } from "./list";

export function getAnswerOfDay(day: number) {
  let answer: string[]
  
  if(day > answers.length) {
    const seed = seedrandom(`day-${day}`)
    answer = answers[Math.floor(seed() * answers.length)]
  } else {
    answer = answers[day]
  }

  const [word = '', hint = ''] = answer
  return {
    word,
    hint: hint || getHint(word)
  }
}