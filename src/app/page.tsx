"use client"

import PassageSelector from "@/components/passage-selector/passsage-selector";
import PassageViewer from "@/components/passage-viewer/passage-viewer";
import { ApplicationContextProvider, useApplicationContext } from "@/context/application-context";
import { theme } from "@/context/theme-context";
import { ThemeProvider } from "@mui/material";
import { GAME_MATCHNG, PASSAGE_SELECT, PASSAGE_VIEW } from "../lib/constants";
import GameMatching from "@/components/game-matching/game-matching";

const Main = () => {
  const { page } = useApplicationContext()

  return (
    <>
      {
        page === PASSAGE_SELECT && <PassageSelector />
      }
      {
        page === PASSAGE_VIEW && <PassageViewer />
      }
      {
        page === GAME_MATCHNG && <GameMatching />
      }
    </>
  )
}

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <ApplicationContextProvider>
        <Main />
      </ApplicationContextProvider>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
    </ThemeProvider>
  )
}