import { useApplicationContext } from "@/context/application-context";
import { GAME_MATCHNG, PASSAGE_VIEW } from "@/lib/constants";
import { shuffleArray } from "@/lib/utils";
import { ExitToApp, RestartAlt, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Box, Button, Fade, LinearProgress, linearProgressClasses, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AnswerOption from "./answer-option";
import GameMatchingHeader from "./game-matching-header";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 6,
  width: "100%",
  borderRadius: 3,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
  },
}));

export default function GameMatching() {
  const { page, passage, setPage } = useApplicationContext()

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
  const [lastParagraphIndex, setLastParagraphIndex] = useState(0)
  const [currentParagraph, setCurrentParagraph] = useState([""])

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [lastSentenceIndex, setLastSentenceIndex] = useState(0)
  const [options, setOptions] = useState([1])

  const resetOptions = () => {
    let temp_options = [currentSentenceIndex + 1]
    let total_options = lastSentenceIndex > 5 ? 4 : lastSentenceIndex - 1

    while (temp_options.length < total_options) {
      let temp_number = Math.random() * currentParagraph.length
      temp_number = Math.floor(temp_number)

      if (
        temp_options.indexOf(temp_number) == -1 &&
        (
          temp_number < currentSentenceIndex - 1 ||
          temp_number > currentSentenceIndex + 1
        )
      ) temp_options.push(temp_number)
    }

    setOptions(shuffleArray(temp_options))
  }

  useEffect(() => {
    setCurrentSentenceIndex(0)
    setCurrentParagraph(passage.current.content[currentParagraphIndex])
  }, [currentParagraphIndex])

  useEffect(() => {
    setLastSentenceIndex(currentParagraph.length - 1)
  }, [currentParagraph])

  useEffect(() => {
    resetOptions()
  }, [currentSentenceIndex])

  useEffect(() => {
    if (currentParagraphIndex == 0) {
      setCurrentParagraph(passage.current.content[0])
    } else {
      setCurrentParagraphIndex(0)
    }
    setLastParagraphIndex(passage.current.content.length - 1)
    resetOptions()
  }, [])

  return (
    <Fade in={page === GAME_MATCHNG}>
      <Box
        className="h-full flex flex-col"
      >
        <GameMatchingHeader />
        <div
          className="p-2 grid content-evenly gap-8"
        >
          <div
            className="grid gap-2"
          >
            <Typography
              variant="body1"
              className="tracking-wider"
            >
              {
                currentParagraph[currentSentenceIndex - 1]
              }
            </Typography>
            <Typography
              variant="h4"
              className="tracking-wider"
            >
              {
                currentParagraph[currentSentenceIndex]
              }
            </Typography>
          </div>
          <div
            className="grid gap-4"
          >
            {
              currentSentenceIndex + 1 <= lastSentenceIndex &&
              options.map((x, i) =>
                <AnswerOption
                  key={i}
                  label={currentParagraph[x]}
                  isCorrect={x == currentSentenceIndex + 1}
                  index={currentSentenceIndex}
                  onClick={() => setCurrentSentenceIndex(i => i + 1)}
                />
              )
            }
            {
              currentSentenceIndex + 1 > lastSentenceIndex &&
              <>
                <Button
                  onClick={() => setCurrentSentenceIndex(0)}
                  startIcon={<RestartAlt />}
                >
                  重新開始
                </Button>
                {
                  currentParagraphIndex + 1 > lastParagraphIndex &&
                  <>
                    <Button
                      onClick={() => setCurrentParagraphIndex(0)}
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
                  !(currentParagraphIndex + 1 > lastParagraphIndex) &&
                  <>
                    <Button
                      onClick={() => setCurrentParagraphIndex(i => i + 1)}
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
                  i < currentParagraphIndex ? 100 : i === currentParagraphIndex ? currentSentenceIndex / lastSentenceIndex * 100 : 0
                }
              />
            )
          }
        </div>
      </Box>
    </Fade>
  )
}