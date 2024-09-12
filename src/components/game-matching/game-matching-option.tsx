import { useApplicationContext } from "@/context/application-context"
import { useGameContext } from "@/context/game-context"
import { UIButton } from "@/design-system/button"
import { ArrowForwardIos } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function GameMatchingOptionListItem(
  {
    index,
    onClick
  }: {
    index: number,
    onClick: VoidFunction
  }
) {
  const { passage } = useApplicationContext()
  const { paragraphIndex, sentenceIndex } = useGameContext()
  const [isClicked, setClicked] = useState(false)
  const isCorrect = index == sentenceIndex + 1

  const handleClick = () => {
    setClicked(true)
    if (!isClicked && isCorrect) setTimeout(() => onClick(), 500)
  }

  useEffect(() => setClicked(false), [sentenceIndex])

  return (
    <UIButton
      color={isClicked ? isCorrect ? 'success' : 'error' : 'primary'}
      variant={isClicked ? isCorrect ? 'contained' : 'outlined' : 'text'}
      endIcon={<ArrowForwardIos />}
      onClick={handleClick}
    >
      <Box
        className="flex-grow"
      >
        <Typography
          className="font-medium"
        >
          {passage.current.content[paragraphIndex][index]}
        </Typography>
      </Box>
    </UIButton>
  )
}