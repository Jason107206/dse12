import { useApplicationContext } from "@/context/application-context";
import { GameContextProvider, useGameContext } from "@/context/game-context";
import { GAME_MATCHNG } from "@/lib/constants";
import { Box, Fade } from "@mui/material";
import GameMatchingContent from "./game-matching-content";
import GameMatchingHeader from "./game-matching-header";
import GameMatchingStart from "./game-matching-start";

const Main = () => {
  const { options } = useGameContext()

  return (
    <Box
      className="h-full flex flex-col"
    >
      <GameMatchingHeader />
      {
        !options && <GameMatchingStart />
      }
      {
        options && <GameMatchingContent />
      }
    </Box>
  )
}

export default function GameMatching() {
  return (
    <GameContextProvider>
      <Main />
    </GameContextProvider>
  )
}