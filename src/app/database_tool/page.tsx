"use client"

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function DatabaseToolLayout() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([""]);
  const [output, setOutput] = useState({});

  useEffect(() => {
    setOutput(
      {
        title: title,
        content: content
      }
    )
  }, [title, content])

  return (
    <div className="grid gap-8">
      <TextField
        label={"Title"}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
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