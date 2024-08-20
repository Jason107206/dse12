"use client"

import { Database } from "@/database/database";
import { Audiotrack, Close, ExitToApp, Pause, PlayArrow, RestartAlt, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Button, Fade, FormControl, IconButton, InputLabel, LinearProgress, linearProgressClasses, MenuItem, Select, SelectChangeEvent, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [passage, setPassage] = useState(2)
  const [status, setStatus] = useState(false)

  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [lastParagraph, setLastParagraph] = useState(Database[passage].content.length - 1)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [lastSentence, setLastSentence] = useState(Database[passage].content[currentParagraph].length - 1)
  const [options, setOptions] = useState([1])

  const [audioSrc, setAudioSrc] = useState("")
  const [audioState, setAudioState] = useState(false)
  const audioPlayer = useRef<HTMLAudioElement>(null)

  const resetOptions = () => {
    let temp_options = [currentSentence + 1]

    while (temp_options.length <= 3) {
      let temp_number = Math.random() * Database[passage].content[currentParagraph].length
      temp_number = Math.floor(temp_number)

      if (
        temp_options.indexOf(temp_number) == -1 &&
        (
          temp_number > currentSentence + 2 ||
          temp_number < currentSentence - 2
        )
      ) temp_options.push(temp_number)
    }

    for (let i = temp_options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp_options[i], temp_options[j]] = [temp_options[j], temp_options[i]];
    }

    setOptions(temp_options)
  }

  useEffect(() => {
    if (status) {
      resetOptions()
      setAudioSrc(Database[passage].audio_src)
    } else {
      setCurrentParagraph(0)
      setCurrentSentence(0)
      setAudioSrc("")
      setAudioState(false)
    }
  }, [status])

  useEffect(() => {
    if (status) resetOptions()
  }, [currentSentence])

  useEffect(() => {
    setLastSentence(Database[passage].content[currentParagraph].length - 1)
  }, [currentParagraph, lastParagraph])

  useEffect(() => {
    setLastParagraph(Database[passage].content.length - 1)
  }, [passage])

  useEffect(() => {
    if (audioState) {
      audioPlayer.current?.play()
    } else {
      audioPlayer.current?.pause()
    }
  }, [audioState])

  const TargetIndexButton = ({
    label,
    isCorrect
  }: {
    label: any,
    isCorrect: Boolean
  }) => {
    const [isClicked, setClicked] = useState(false)

    return <Button
      variant={(isClicked && isCorrect) ? "contained" : "outlined"}
      size="large"
      onClick={() => {
        setClicked(true)
        if (isCorrect) setTimeout(() => {
          setCurrentSentence(currentSentence + 1)
          setClicked(false)
        }, 700)
      }}
      color={isClicked ? isCorrect ? "success" : "error" : "primary"}
    >
      {label}
    </Button>
  }

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 6,
    width: "100%",
    borderRadius: 3,
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 3,
    },
  }));

  return (
    <div
      className="h-full"
    >
      <div
        className="p-8 h-full grid"
      >
        {
          !status &&
          <Fade in={!status}>
            <div
              className="flex flex-col items-end justify-center gap-4"
            >
              <FormControl fullWidth>
                <InputLabel
                  id="passage_select_label"
                >
                  篇章
                </InputLabel>
                <Select
                  labelId="passage_select_label"
                  label="篇章"
                  onChange={(event: SelectChangeEvent) => {
                    setPassage(parseInt(event.target.value))
                  }}
                  disabled={status}
                  defaultValue={passage.toString()}
                >
                  {
                    Database.map((x, i) =>
                      <MenuItem key={i} value={i}>
                        {x.title}
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
              <Button
                variant={"outlined"}
                startIcon={<PlayArrow />}
                onClick={() => setStatus(true)}
              >
                開始
              </Button>
            </div>
          </Fade>
        }
        {
          status &&
          <Fade in={status}>
            <div
              className="grid grid-rows-[auto_1fr]"
            >
              <div
                className="flex justify-between items-center gap-4"
              >
                <IconButton
                  onClick={() => setStatus(false)}
                >
                  <Close />
                </IconButton>
                <div
                  className="flex items-center gap-4"
                >
                  <Audiotrack color="secondary" />
                  <Button
                    color="secondary"
                    variant={audioState ? "contained" : "outlined"}
                    startIcon={audioState ? <Pause /> : <PlayArrow />}
                    onClick={() => setAudioState(!audioState)}
                  >
                    {
                      audioState ? "暫停" : "開始"
                    }
                  </Button>
                </div>
              </div>
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
                      Database[passage].content[currentParagraph][currentSentence - 1]
                    }
                  </Typography>
                  <Typography
                    variant="h5"
                    className="tracking-wider"
                  >
                    {
                      Database[passage].content[currentParagraph][currentSentence]
                    }
                  </Typography>
                </div>
                <div
                  className="grid gap-4"
                >
                  {
                    currentSentence + 1 <= lastSentence &&
                    options.map((x, i) =>
                      <TargetIndexButton
                        key={i}
                        label={Database[passage].content[currentParagraph][x]}
                        isCorrect={x == currentSentence + 1}
                      />
                    )
                  }
                  {
                    currentSentence + 1 > lastSentence &&
                    <>
                      <Button
                        onClick={() => setCurrentSentence(0)}
                        startIcon={<RestartAlt />}
                      >
                        重新開始
                      </Button>
                      {
                        currentParagraph + 1 > lastParagraph &&
                        <>
                          <Button
                            onClick={() => {
                              setCurrentParagraph(0)
                              setCurrentSentence(0)
                            }}
                            startIcon={<SkipPrevious />}
                          >
                            從頭開始
                          </Button>
                          <Button
                            onClick={() => setStatus(false)}
                            startIcon={<ExitToApp />}
                          >
                            退出
                          </Button>
                        </>
                      }
                      {
                        !(currentParagraph + 1 > lastParagraph) &&
                        <>
                          <Button
                            onClick={() => {
                              setCurrentParagraph(currentParagraph + 1)
                              setCurrentSentence(0)
                            }}
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
                  [...Array(Database[passage].content.length)].map((x, i) =>
                    <BorderLinearProgress
                      key={i}
                      variant="determinate"
                      value={
                        i < currentParagraph ? 100 : i === currentParagraph ? currentSentence / lastSentence * 100 : 0
                      }
                    />
                  )
                }
              </div>
            </div>
          </Fade>
        }
      </div>
      <audio
        ref={audioPlayer}
        src={audioSrc}
        onPause={() => setAudioState(false)}
        onEnded={() => setAudioState(false)}
      />
    </div>
  );
}