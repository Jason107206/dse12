import { GameContextProvider, useGameContext } from "@/context/game-context";
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
        options === null &&
        <Fade
          className="flex flex-grow flex-col"
          in={options === null}
        >
          <Box>
            <GameMatchingStart />
          </Box>
        </Fade>
      }
      {
        options !== null &&
        <Fade
          className="flex flex-grow flex-col"
          in={options !== null}>
          <Box>
            <GameMatchingContent />
          </Box>
        </Fade>
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