"use client"

import { Database } from "@/database/database";
import { PlayArrow, Stop } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from "@mui/material";
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

      if (temp_options.indexOf(sentence) == -1 && temp_options.indexOf(temp_number) == -1) temp_options.push(temp_number)
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
    setStatus(!status)
  }

  const handleResponse = (response: SetStateAction<string>) => {
    setSelected(response)
    setTimeout(() => {
      setSelected("")
      if (response == answer.toString()) {
        setSentence(sentence + 1)
        setAnswer(answer + 1)
      }
    }, 500)
  }

  useEffect(() => {
    resetOptions()
  }, [answer])

  return (
    <div
      className="p-8 h-full grid grid-rows-[1fr_auto] gap-8"
    >
      <div
        className="grid content-evenly gap-8"
      >
        {
          status && <>
            <div>
              {
                sentence > 0 &&
                <Typography variant="body1">
                  {Database[passage].content[sentence - 1]}
                </Typography>
              }
              <Typography variant="h5">
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
                      label={Database[passage].content[x]}
                    />
                  )
                }
              </RadioGroup>
            </FormControl>
          </>
        }
      </div>
      <div className="grid gap-4">
        {
          !status &&
          <FormControl fullWidth>
            <InputLabel id="passage_select_label">
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
        }
        <div className="flex items-center justify-end">
          <Button
            variant={status ? "contained" : "outlined"}
            startIcon={status ? <Stop /> : <PlayArrow />}
            onClick={initializePractice}
          >
            {status ? "停止" : "開始"}
          </Button>
        </div>
      </div>
    </div>
  );
}