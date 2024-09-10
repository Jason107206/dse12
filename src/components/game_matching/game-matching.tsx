import { useApplicationContext } from "@/context/application-context";
import { GAME_MATCHNG, PASSAGE_VIEW } from "@/lib/constants";
import { shuffleArray } from "@/lib/utils";
import { ExitToApp, RestartAlt, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Box, Button, Fade, LinearProgress, linearProgressClasses, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AnswerOption from "./answer-option";
import GameMatchingHeader from "./game-matching-header";
import { GameContextProvider, useGameContext } from "@/context/game-context";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 6,
  width: "100%",
  borderRadius: 3,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
  },
}));

const Main = () => {
  const { page, passage, setPage } = useApplicationContext()
  const { options, paragraphIndex, paragraphLength, sentenceIndex, sentenceLength, setOptions, setParagraphIndex, setParagraphLength, setSentenceIndex, setSentenceLength } = useGameContext()

  const [currentParagraph, setCurrentParagraph] = useState([""])

  const resetOptions = () => {
    let temp_options = [sentenceIndex + 1]
    let total_options = sentenceLength > 5 ? 4 : sentenceLength - 1

    while (temp_options.length < total_options) {
      let temp_number = Math.random() * currentParagraph.length
      temp_number = Math.floor(temp_number)

      if (
        temp_options.indexOf(temp_number) == -1 &&
        (
          temp_number < sentenceIndex - 1 ||
          temp_number > sentenceIndex + 1
        )
      ) temp_options.push(temp_number)
    }

    setOptions(shuffleArray(temp_options))
  }

  useEffect(() => {
    setSentenceIndex(0)
    setCurrentParagraph(passage.current.content[paragraphIndex])
  }, [paragraphIndex])

  useEffect(() => {
    setSentenceLength(currentParagraph.length - 1)
  }, [currentParagraph])

  useEffect(() => {
    resetOptions()
  }, [sentenceIndex])

  useEffect(() => {
    if (paragraphIndex == 0) {
      setCurrentParagraph(passage.current.content[0])
    } else {
      setParagraphIndex(0)
    }
    setParagraphLength(passage.current.content.length - 1)
    resetOptions()
  }, [])

  return (
    <Fade in={page === GAME_MATCHNG}>
      <Box
        className="h-full flex flex-col"
      >
        <GameMatchingHeader />
        <div
          className="p-6 grid flex-grow content-evenly gap-8"
        >
          <div
            className="grid gap-2"
          >
            <Typography
              variant="body1"
              className="tracking-wider"
            >
              {
                currentParagraph[sentenceIndex - 1]
              }
            </Typography>
            <Typography
              variant="h4"
              className="tracking-wider"
            >
              {
                currentParagraph[sentenceIndex]
              }
            </Typography>
          </div>
          <div
            className="grid gap-4"
          >
            {
              sentenceIndex + 1 <= sentenceLength &&
              options.map((x, i) =>
                <AnswerOption
                  key={i}
                  label={currentParagraph[x]}
                  isCorrect={x == sentenceIndex + 1}
                  index={sentenceIndex}
                  onClick={() => setSentenceIndex(i => i + 1)}
                />
              )
            }
            {
              sentenceIndex + 1 > sentenceLength &&
              <>
                <Button
                  onClick={() => setSentenceIndex(0)}
                  startIcon={<RestartAlt />}
                >
                  重新開始
                </Button>
                {
                  paragraphIndex + 1 > paragraphLength &&
                  <>
                    <Button
                      onClick={() => setParagraphIndex(0)}
                      startIcon={<SkipPrevious />}
                    >
                      從頭開始
                    </Button>
                    <Button
                      onClick={() => setPage(PASSAGE_VIEW)}
                      startIcon={<ExitToApp />}
                    >
                      退出
                    </Button>
                  </>
                }
                {
                  !(paragraphIndex + 1 > paragraphLength) &&
                  <>
                    <Button
                      onClick={() => setParagraphIndex(i => i + 1)}
                      startIcon={<SkipNext />}
                    >
                      下一段落
                    </Button>
                  </>
                }
              </>
            }
          </div>
        </div>
        <div
          className="flex gap-2"
        >
          {
            [...Array(passage.current.content.length)].map((x, i) =>
              <BorderLinearProgress
                key={i}
                variant="determinate"
                value={
                  i < paragraphIndex ? 100 : i === paragraphIndex ? sentenceIndex / sentenceLength * 100 : 0
                }
              />
            )
          }
        </div>
      </Box>
    </Fade>
  )
}

export default function GameMatching() {
  return (
    <GameContextProvider>
      <Main />
    </GameContextProvider>
  )
}