import { useApplicationContext } from "@/context/application-context";
import { useGameContext } from "@/context/game-context";
import { Start } from "@mui/icons-material";
import { Box, Fab, Fade, Typography } from "@mui/material";
import { useEffect } from "react";

const Main = () => {
  const { passage } = useApplicationContext()
  const { generateOptions, setParagraphIndex, setParagraphLength, setSentenceIndex, setSentenceLength } = useGameContext()

  const handleStart = () => {
    generateOptions()
  }

  useEffect(() => {
    setParagraphIndex(0)
    setParagraphLength(passage.current.content.length - 1)
    setSentenceIndex(0)
    setSentenceLength(passage.current.content[0].length - 1)
  }, [])

  return (
    <Box
      className="p-6 flex flex-grow flex-col items-center justify-evenly"
    >
      <Box
        className="flex flex-col items-center gap-4"
      >
        <Typography
          className="text-3xl font-medium"
        >
          {passage.current.title}
        </Typography>
        <Typography
          className="text-lg"
        >
          {passage.current.author}
        </Typography>
      </Box>
      <Box>
        <Fab
          className="px-6 flex items-center gap-4"
          color="primary"
          variant="extended"
          onClick={handleStart}
        >
          <Start />
          <Typography>
            開始
          </Typography>
        </Fab>
      </Box>
    </Box>
  )
}

export default function GameMatchingStart() {
  const { options } = useGameContext()

  return (
    <Fade
      className="flex flex-grow flex-col"
      in={options === null}
    >
      <Box>
        <Main />
      </Box>
    </Fade>
  )
}