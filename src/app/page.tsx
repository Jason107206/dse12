"use client"

import { Database } from "@/database/database";
import { Audiotrack, Close, ExitToApp, Pause, PlayArrow, RestartAlt } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [passage, setPassage] = useState(0)
  const [status, setStatus] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [targetIndex, setTargetIndex] = useState(1)
  const [lastIndex, setLastIndex] = useState(Database[passage].content.length - 1)
  const [options, setOptions] = useState([0])

  const [audioSrc, setAudioSrc] = useState("")
  const [audioState, setAudioState] = useState(false)
  const audioPlayer = useRef<HTMLAudioElement>(null)

  const resetOptions = () => {
    let temp_options = [targetIndex]

    while (temp_options.length <= 3) {
      let temp_number = Math.random() * Database[passage].content.length
      temp_number = Math.floor(temp_number)

      if (
        temp_options.indexOf(temp_number) == -1 &&
        (
          temp_number > targetIndex + 3 ||
          temp_number < targetIndex - 3
        )
      ) temp_options.push(temp_number)
    }

    for (let i = temp_options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp_options[i], temp_options[j]] = [temp_options[j], temp_options[i]];
    }

    setOptions(temp_options)
  }

  const initializePractice = () => {
    setCurrentIndex(0)
    setTargetIndex(1)
    setStatus(true)
    setAudioSrc(Database[passage].audio_src)
  }

  const exitPractice = () => {
    setStatus(false)
    setAudioSrc("")
    setAudioState(false)
  }

  const handleResponse = () => {
    setCurrentIndex(currentIndex + 1)
    setTargetIndex(targetIndex + 1)
  }

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
          handleResponse()
          setClicked(false)
        }, 700)
      }}
      color={isClicked ? isCorrect ? "success" : "error" : "primary"}
    >
      {label}
    </Button>
  }

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5
  }));

  useEffect(() => resetOptions(), [targetIndex])
  useEffect(() => {
    setLastIndex(Database[passage].content.length - 1)
    resetOptions()
  }, [passage])
  useEffect(() => {
    if (audioState) {
      audioPlayer.current?.play()
    } else {
      audioPlayer.current?.pause()
    }
  }, [audioState])

  return (
    <div
      className="h-full"
    >
      <div
        className="p-8 h-full grid"
      >
        {
          !status &&
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
                onChange={(event: SelectChangeEvent) => setPassage(parseInt(event.target.value))}
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
              onClick={initializePractice}
            >
              開始
            </Button>
          </div>
        }
        {
          status &&
          <div
            className="grid grid-rows-[auto_1fr]"
          >
            <div
              className="flex justify-between items-center gap-4"
            >
              <IconButton
                onClick={exitPractice}
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
                    Database[passage].content[currentIndex - 1]
                  }
                </Typography>
                <Typography
                  variant="h5"
                  className="tracking-wider"
                >
                  {
                    Database[passage].content[currentIndex]
                  }
                </Typography>
              </div>
              <div
                className="grid gap-4"
              >
                {
                  targetIndex <= lastIndex &&
                  options.map((x, i) =>
                    <TargetIndexButton
                      key={i}
                      label={Database[passage].content[x]}
                      isCorrect={x == targetIndex}
                    />
                  )
                }
                {
                  targetIndex > lastIndex &&
                  <>
                    <Button
                      onClick={initializePractice}
                      startIcon={<RestartAlt />}
                    >
                      重新開始
                    </Button>
                    <Button
                      onClick={exitPractice}
                      startIcon={<ExitToApp />}
                    >
                      退出
                    </Button>
                  </>
                }
              </div>
            </div>
            <BorderLinearProgress
              variant="determinate"
              value={currentIndex / lastIndex * 100}
            />
          </div>
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