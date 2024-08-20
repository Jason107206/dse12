"use client"

import { Add, ContentCopy, Delete } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function DatabaseToolLayout() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [audioSrc, setAudioSrc] = useState("")
  const [content, setContent] = useState([[]] as string[][])
  const [output, setOutput] = useState({})

  const processRawPassage = (passage: String) => passage.replaceAll(/[\d\s]/g, '').split(/(.+?[。？；])/g).filter(Boolean);

  useEffect(() => {
    setOutput(
      {
        title: title,
        author: author,
        audio_src: audioSrc,
        content: content
      }
    )
  }, [title, author, audioSrc, content])

  return (
    <div
      className="p-8 h-full grid grid-rows-[auto_1fr] gap-8"
    >
      <div
        className="grid grid-cols-[auto_auto_1fr] gap-8"
      >
        <TextField
          label={"Title"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
        />
        <TextField
          label={"Author"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAuthor(event.target.value)
          }
        />
        <TextField
          label={"Audio Source"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAudioSrc(event.target.value)
          }
        />
      </div>
      <div
        className="grid grid-cols-2 gap-8"
      >
        <div
          className="flex flex-col gap-8"
        >
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setContent([...content, []])}
          >
            Add Paragraph
          </Button>
          {
            content.map((x, i) =>
              <FormControl
                key={i}
                variant="outlined"
              >
                <InputLabel
                  htmlFor={"paragraph_" + i}
                >
                  {"Paragraph " + i}
                </InputLabel>
                <OutlinedInput
                  multiline
                  id={"paragraph_" + i}
                  label={"Paragraph " + i}
                  onChange={event =>
                    setContent(content.map((x, j) =>
                      j === i ? processRawPassage(event.target.value) : x
                    ))
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setContent(content.filter((x, j) => j !== i))
                        }
                      >
                        <Delete />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )
          }
        </div>
        <div
          className="flex flex-col gap-8"
        >
          <Button
            variant="outlined"
            startIcon={<ContentCopy />}
            onClick={() => navigator.clipboard.writeText(JSON.stringify(output, null, 2))}
          >
            Copy
          </Button>
          <TextField
            multiline
            disabled
            variant="filled"
            label={"Output"}
            value={JSON.stringify(output, null, 2)}
          />
        </div>
      </div>
    </div>
  );
}