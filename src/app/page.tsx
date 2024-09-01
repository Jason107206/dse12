"use client"

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import PassageSelector from "./components/passage-selector";
import PassageViewer from "./components/passage-viewer";
import { PASSAGE_SELECT, PASSAGE_VIEW } from "./constants";

const VERSION = 14

interface PassageContextType {
  passage: Passage | null | undefined,
  setPassage: Dispatch<SetStateAction<Passage | null | undefined>>
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
    setPassage: () => { }
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
    <PassageContext.Provider value={{ passage, setPassage }}>
      {
        page === PASSAGE_SELECT &&
        <PassageSelector />
      }
      {
        page === PASSAGE_VIEW &&
        <PassageViewer />
      }
    </PassageContext.Provider>
  )
}