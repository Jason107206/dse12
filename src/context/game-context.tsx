import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface GameContextType {
  options: number[],
  paragraphIndex: number,
  paragraphLength: number,
  sentenceIndex: number,
  sentenceLength: number,
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
  const [options, setOptions] = useState([0])
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [paragraphLength, setParagraphLength] = useState(0)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [sentenceLength, setSentenceLength] = useState(0)

  return (
    <GameContext.Provider
      value={{
        options,
        paragraphIndex,
        paragraphLength,
        sentenceIndex,
        sentenceLength,
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