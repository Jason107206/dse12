import { useApplicationContext } from "@/context/application-context"
import { useGameContext } from "@/context/game-context"
import { PASSAGE_VIEW } from "@/lib/constants"
import { ExitToApp, Replay, SkipNext, SkipPrevious } from "@mui/icons-material"
import { Box, Fab, Fade, Typography } from "@mui/material"
import { useEffect } from "react"
import AnswerOption from "./game-matching-option"
import GameMatchingProgress from "./game-matching-progress"
import GameMatchingOption from "./game-matching-option"

const Main = () => {
  const { passage, setPage } = useApplicationContext()
  const { options, paragraphIndex, paragraphLength, sentenceIndex, sentenceLength, generateOptions, setParagraphIndex, setParagraphLength, setSentenceIndex, setSentenceLength } = useGameContext()

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
      <Box
        className="flex flex-grow flex-col justify-evenly"
      >
        <Box
          className="flex flex-col items-center justify-center gap-2"
        >
          <Typography
            className="text-xl text-center"
          >
            {passage.current.content[paragraphIndex][sentenceIndex - 1]}
          </Typography>
          <Typography
            className="text-3xl font-medium text-center"
          >
            {passage.current.content[paragraphIndex][sentenceIndex]}
          </Typography>
        </Box>
        <Box
          className="flex flex-col gap-4"
        >
          {
            sentenceIndex + 1 <= sentenceLength &&
            options.map((x, i) =>
              <GameMatchingOption
                key={i}
                label={passage.current.content[paragraphIndex][x]}
                isCorrect={x == sentenceIndex + 1}
                index={sentenceIndex}
                onClick={() => setSentenceIndex(i => i + 1)}
              />
            )
          }
          {
            sentenceIndex + 1 > sentenceLength &&
            <Box
              className="flex flex-col items-center gap-6"
            >
              <Fab
                className="px-6 flex items-center gap-4"
                variant="extended"
                onClick={() => setSentenceIndex(0)}
              >
                <SkipPrevious />
                <Typography>
                  回到段首
                </Typography>
              </Fab>
              {
                paragraphIndex + 1 > paragraphLength &&
                <>
                  <Fab
                    className="px-6 flex items-center gap-4"
                    color="primary"
                    variant="extended"
                    onClick={() => setParagraphIndex(0)}
                  >
                    <Replay />
                    <Typography>
                      從頭開始
                    </Typography>
                  </Fab>
                  <Fab
                    className="px-6 flex items-center gap-4"
                    color="primary"
                    variant="extended"
                    onClick={() => setPage(PASSAGE_VIEW)}
                  >
                    <ExitToApp />
                    <Typography>
                      退出
                    </Typography>
                  </Fab>
                </>
              }
              {
                !(paragraphIndex + 1 > paragraphLength) &&
                <Fab
                  className="px-6 flex items-center gap-4"
                  color="primary"
                  variant="extended"
                  onClick={() => setParagraphIndex(i => i + 1)}
                >
                  <SkipNext />
                  <Typography>
                    下一段落
                  </Typography>
                </Fab>
              }
            </Box>
          }
        </Box>
      </Box>
      <GameMatchingProgress />
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