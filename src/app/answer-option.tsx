import { Button } from "@mui/material"
import { useState } from "react"

const AnswerOption = (
  {
    label,
    isCorrect,
    onClick
  }: {
    label: any,
    isCorrect: Boolean,
    onClick: VoidFunction
  }
) => {
  const [isClicked, setClicked] = useState(false)

  return <Button
    variant={(isClicked && isCorrect) ? "contained" : "outlined"}
    size="large"
    onClick={() => {
      setClicked(true)
      if (isCorrect) setTimeout(() => onClick(), 500)
    }}
    color={isClicked ? isCorrect ? "success" : "error" : "primary"}
  >
    {label}
  </Button>
}

export default AnswerOption