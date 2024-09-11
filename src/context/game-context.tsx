import { shuffleArray } from "@/lib/utils"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface GameContextType {
  options: number[],
  paragraphIndex: number,
  paragraphLength: number,
  sentenceIndex: number,
  sentenceLength: number,
  generateOptions: () => void,
  setOptions: Dispatch<SetStateAction<number[]>>,
  setParagraphIndex: Dispatch<SetStateAction<number>>,
  setParagraphLength: Dispatch<SetStateAction<number>>,
  setSentenceIndex: Dispatch<SetStateAction<number>>,
  setSentenceLength: Dispatch<SetStateAction<number>>,
}

const GameContext = createContext<GameContextType>({} as GameContextType)

export const GameContextProvider = (
  {
    children
  }: {
    children: ReactNode
  }
) => {
  const [options, setOptions] = useState(null as unknown as number[])
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [paragraphLength, setParagraphLength] = useState(0)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [sentenceLength, setSentenceLength] = useState(0)

  const generateOptions = () => {
    let x = [sentenceIndex + 1]
    let limit = sentenceLength > 5 ? 4 : sentenceLength - 1

    while (x.length < limit) {
      let i = Math.random() * sentenceLength
      i = Math.floor(i)

      const table = [
        x.indexOf(i) == -1,
        i < sentenceIndex - 1 || i > sentenceIndex + 1
      ]

      table.every(x => x) && x.push(i)
    }

    setOptions(shuffleArray(x))
  }

  return (
    <GameContext.Provider
      value={{
        options,
        paragraphIndex,
        paragraphLength,
        sentenceIndex,
        sentenceLength,
        generateOptions,
        setOptions,
        setParagraphIndex,
        setParagraphLength,
        setSentenceIndex,
        setSentenceLength
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)