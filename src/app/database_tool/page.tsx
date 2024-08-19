"use client"

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function DatabaseToolLayout() {
  const [title, setTitle] = useState("")
  const [audioSrc, setAudioSrc] = useState("")
  const [content, setContent] = useState([""])
  const [output, setOutput] = useState({})

  useEffect(() => {
    setOutput(
      {
        title: title,
        audio_src: audioSrc,
        content: content
      }
    )
  }, [title, audioSrc, content])

  return (
    <div className="grid gap-8">
      <TextField
        label={"Title"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
        }
      />
      <TextField
        label={"Audio Source"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setAudioSrc(event.target.value)
        }
      />
      <TextField
        multiline
        label={"Content"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setContent(event.target.value.replaceAll(/[\d\s]/g, '').split(/(.+?。)/g).filter(Boolean))
        }
      />
      <TextField
        multiline
        disabled
        variant="filled"
        label={"Output"}
        value={JSON.stringify(output)}
      />
    </div>
  );
}