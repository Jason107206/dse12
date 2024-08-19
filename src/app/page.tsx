"use client"

import { Database } from "@/database/database";
import { Close, HomeMax, HomeOutlined, PlayArrow, Stop } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, styled, Typography, typographyClasses } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";

export default function Home() {
  const [passage, setPassage] = useState(0)
  const [status, setStatus] = useState(false)

  const [sentence, setSentence] = useState(0)
  const [answer, setAnswer] = useState(1)
  const [options, setOptions] = useState([0])
  const [selected, setSelected] = useState("")

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
  }

  const exitPractice = () => {
    setStatus(false)
  }

  const handleResponse = (response: SetStateAction<string>) => {
    setSelected(response)
    setTimeout(() => {
      if (response == answer.toString()) {
        setSelected("")
        setSentence(sentence + 1)
        setAnswer(answer + 1)
      } else {
        setSelected("")
      }
    }, 500)
  }

  useEffect(() => {
    resetOptions()
  }, [answer])

  return (
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
          <div>
            <IconButton
              color="info"
              onClick={exitPractice}
            >
              <Close />
            </IconButton>
          </div>
          <div
            className="p-2 grid content-evenly gap-8"
          >
            <div
              className="grid gap-4"
            >
              {
                sentence > 0 &&
                <Typography
                  variant="body1"
                  className="first-letter:text-2xl first-letter:mr-0.5"
                >
                  {Database[passage].content[sentence - 1]}
                </Typography>
              }
              <Typography
                variant="h5"
                className="first-letter:text-4xl first-letter:mr-0.5"
              >
                {Database[passage].content[sentence]}
              </Typography>
            </div>
            <FormControl>
              <RadioGroup
                className="gap-4"
                onChange={(event: SelectChangeEvent) => handleResponse(event.target.value)}
                value={selected}
              >
                {
                  options.map((x, i) =>
                    <FormControlLabel
                      key={i}
                      value={x}
                      control={<Radio color={selected == x.toString() ? x == answer ? "success" : "error" : "primary"} />}
                      label={
                        <Typography
                          variant="body1"
                          className="first-letter:text-2xl first-letter:mr-0.5"
                        >
                          {Database[passage].content[x]}
                        </Typography>
                      }
                    />
                  )
                }
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      }
    </div>
  );
}