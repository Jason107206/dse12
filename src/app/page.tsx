"use client"

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import PassageSelector from "./components/passage-selector";
import PassageViewer from "./components/passage-viewer";
import { GAME_MATCHNG, PASSAGE_SELECT, PASSAGE_VIEW } from "./constants";
import GameMatching from "./components/game-matching";

const VERSION = 15

interface PassageContextType {
  passage: Passage | null | undefined,
  page: string | null | undefined,
  setPassage: Dispatch<SetStateAction<Passage | null | undefined>>
  setPage: Dispatch<SetStateAction<string | null | undefined>>
}

export interface Passage {
  title: string,
  author: string,
  audio_src: string,
  content: string[][]
}

export const PassageContext = createContext<PassageContextType>(
  {
    passage: null,
    page: null,
    setPassage: () => { },
    setPage: () => { }
  }
)

export default function Home() {
  const [page, setPage] = useState<string | null>()
  const [passage, setPassage] = useState<Passage | null>()

  useEffect(() => {
    setTimeout(() => setPage(PASSAGE_SELECT), 200)
  }, [])

  useEffect(() => {
    if (page) setPage(passage ? PASSAGE_VIEW : PASSAGE_SELECT)
  }, [passage])

  return (
    <PassageContext.Provider value={{ passage, page, setPassage, setPage }}>
      {
        page === PASSAGE_SELECT &&
        <PassageSelector />
      }
      {
        page === PASSAGE_VIEW &&
        <PassageViewer />
      }
      {
        page === GAME_MATCHNG &&
        <GameMatching />
      }
    </PassageContext.Provider>
  )
}