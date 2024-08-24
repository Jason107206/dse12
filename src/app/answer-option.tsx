import { Button } from "@mui/material"
import { useEffect, useState } from "react"

const AnswerOption = (
  {
    label,
    isCorrect,
    index,
    onClick
  }: {
    label: any,
    isCorrect: Boolean,
    index: number,
    onClick: VoidFunction
  }
) => {
  const [isClicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    if (!isClicked && isCorrect) setTimeout(() => {
      setClicked(false)
      onClick()
    }, 500)
  }

  useEffect(() => {
    if (isClicked) setClicked(false)
  }, [index])

  return <Button
    variant={(isClicked && isCorrect) ? "contained" : "outlined"}
    size="large"
    onClick={handleClick}
    color={isClicked ? isCorrect ? "success" : "error" : "primary"}
  >
    {label}
  </Button>
}

export default AnswerOption