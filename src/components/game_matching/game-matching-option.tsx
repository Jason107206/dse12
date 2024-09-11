import { ArrowForwardIos } from "@mui/icons-material"
import { Box, Button, buttonClasses, containerClasses, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function GameMatchingOption(
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
) {
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

  return (
    <Button
      color={isClicked ? isCorrect ? 'success' : 'error' : 'primary'}
      endIcon={<ArrowForwardIos />}
      variant="outlined"
      onClick={handleClick}
    >
      <Box
        className="py-2 flex-grow"
      >
        <Typography
          className="font-medium"
        >
          {label}
        </Typography>
      </Box>
    </Button>
  )
}