import { useApplicationContext } from "@/context/application-context";
import { useGameContext } from "@/context/game-context";
import { Box, LinearProgress, linearProgressClasses, styled } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 4,
  width: "100%",
  borderRadius: 2,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
  },
}));

export default function GameMatchingProgress() {
  const { passage } = useApplicationContext()
  const { paragraphIndex, sentenceIndex, sentenceLength } = useGameContext()

  const progress = (
    value: number
  ) => (
    value < paragraphIndex ? 100 : value === paragraphIndex ? sentenceIndex / sentenceLength * 100 : 0
  )

  return (
    <Box
      className="flex gap-2"
    >
      {
        [...Array(passage.current.content.length)].map((x, i) =>
          <BorderLinearProgress
            key={i}
            variant="determinate"
            value={progress(i)}
          />
        )
      }
    </Box>
  )
}