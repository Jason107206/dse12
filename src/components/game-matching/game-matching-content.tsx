import { useApplicationContext } from "@/context/application-context"
import { useGameContext } from "@/context/game-context"
import { PASSAGE_VIEW } from "@/lib/constants"
import { ExitToApp, Replay, SkipNext, SkipPrevious } from "@mui/icons-material"
import { Box, Fab, Fade, Typography } from "@mui/material"
import { useEffect } from "react"
import GameMatchingOptionList from "./game-matching-option-list"
import GameMatchingProgress from "./game-matching-progress"
import GameMatchingEndingControl from "./game-matching-ending-control"

const Main = () => {
  const { passage, setPage } = useApplicationContext()
  const { paragraphIndex, paragraphLength, sentenceIndex, sentenceLength, generateOptions, setParagraphIndex, setParagraphLength, setSentenceIndex, setSentenceLength } = useGameContext()

  useEffect(() => {
    setSentenceIndex(0)
    setSentenceLength(passage.current.content[paragraphIndex].length - 1)
  }, [paragraphIndex])

  useEffect(() => {
    generateOptions()
  }, [sentenceLength])

  useEffect(() => {
    generateOptions()
  }, [sentenceIndex])

  useEffect(() => {
    setParagraphIndex(0)
    setParagraphLength(passage.current.content.length - 1)
  }, [])

  return (
    <Box
      className="p-6 flex flex-grow flex-col"
    >
      <GameMatchingProgress />
      <Box
        className="flex flex-grow flex-col"
      >
        <Box
          className="flex flex-grow flex-col justify-center gap-4"
        >
          <Typography
            className="text-lg text-center"
          >
            {passage.current.content[paragraphIndex][sentenceIndex - 1]}
          </Typography>
          <Typography
            className="text-2xl font-medium text-center"
          >
            {passage.current.content[paragraphIndex][sentenceIndex]}
          </Typography>
        </Box>
        <Box
          className="flex flex-col gap-2"
        >
          {
            sentenceIndex + 1 <= sentenceLength && <GameMatchingOptionList />
          }
          {
            sentenceIndex + 1 > sentenceLength && <GameMatchingEndingControl />
          }
        </Box>
      </Box>
    </Box>
  )
}

export default function GameMatchingContent() {
  const { options } = useGameContext()

  return (
    <Fade
      className="flex flex-grow flex-col"
      in={options !== null}
    >
      <Box>
        <Main />
      </Box>
    </Fade>
  )
}