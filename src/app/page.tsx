"use client"

import { Database } from "@/database/database";
import { Audiotrack, Close, Pause, PlayArrow } from "@mui/icons-material";
import { Button, Fab, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [passage, setPassage] = useState(0)
  const [status, setStatus] = useState(false)

  const [sentence, setSentence] = useState(0)
  const [answer, setAnswer] = useState(1)
  const [options, setOptions] = useState([0])

  const [audioSrc, setAudioSrc] = useState("")
  const [audioState, setAudioState] = useState(false)
  const audioPlayer = useRef<HTMLAudioElement>(null)

  const resetOptions = () => {
    let temp_options = [answer]

    while (temp_options.length <= 3) {
      let temp_number = Math.random() * Database[passage].content.length
      temp_number = Math.floor(temp_number)

      if (
        temp_options.indexOf(sentence - 1) == -1 &&
        temp_options.indexOf(sentence) == -1 &&
        temp_options.indexOf(temp_number) == -1
      ) temp_options.push(temp_number)
    }

    for (let i = temp_options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp_options[i], temp_options[j]] = [temp_options[j], temp_options[i]];
    }

    setOptions(temp_options)
  }

  const initializePractice = () => {
    setSentence(0)
    setAnswer(1)
    setStatus(true)
    setAudioSrc(Database[passage].audio_src)
  }

  const exitPractice = () => {
    setStatus(false)
    setAudioSrc("")
    setAudioState(false)
  }

  const handleResponse = () => {
    setSentence(sentence + 1)
    setAnswer(answer + 1)
  }

  const AnswerButton = ({
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

  useEffect(() => resetOptions(), [answer])

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
                onChange={(event: SelectChangeEvent) => {
                  setPassage(parseInt(event.target.value))
                }}
                disabled={status}
                value="0"
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
                  onClick={() => {
                    audioState ? audioPlayer.current?.pause() : audioPlayer.current?.play()
                    setAudioState(!audioState)
                  }}
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
                className="grid gap-4"
              >
                <Typography
                  variant="h5"
                  className="tracking-wider"
                >
                  {
                    Database[passage].content[sentence]
                  }
                </Typography>
              </div>
              <div
                className="grid gap-4"
              >
                {
                  options.map((x, i) =>
                    <AnswerButton
                      key={i}
                      label={Database[passage].content[x]}
                      isCorrect={x == answer}
                    />
                  )
                }
              </div>
            </div>
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