import { useApplicationContext } from "@/context/application-context"
import { useGameContext } from "@/context/game-context"
import { UIButton } from "@/design-system/button"
import { PASSAGE_VIEW } from "@/lib/constants"
import { ExitToApp, Replay, SkipNext, SkipPrevious } from "@mui/icons-material"
import { Typography } from "@mui/material"

const RestartParagraph = () => {
  const { setSentenceIndex } = useGameContext()

  return (
    <UIButton
      startIcon={<SkipPrevious />}
      onClick={() => setSentenceIndex(0)}
    >
      <Typography>
        回到段首
      </Typography>
    </UIButton>
  )
}

const NextParagraph = () => {
  const { setParagraphIndex } = useGameContext()

  return (
    <UIButton
      color="primary"
      variant="contained"
      startIcon={<SkipNext />}
      onClick={() => setParagraphIndex(i => i + 1)}
    >
      <Typography>
        下一段落
      </Typography>
    </UIButton>
  )
}

const RestartPassage = () => {
  const { setParagraphIndex } = useGameContext()

  return (
    <UIButton
      startIcon={<Replay />}
      onClick={() => setParagraphIndex(0)}
    >
      <Typography>
        從頭開始
      </Typography>
    </UIButton>
  )
}

const ExitPassage = () => {
  const { setPage } = useApplicationContext()

  return (
    <UIButton
      color="primary"
      variant="contained"
      startIcon={<ExitToApp />}
      onClick={() => setPage(PASSAGE_VIEW)}
    >
      <Typography>
        退出
      </Typography>
    </UIButton>
  )
}

export default function GameMatchingEndingControl() {
  const { paragraphIndex, paragraphLength } = useGameContext()
  return (
    <>
      <RestartParagraph />
      {
        paragraphIndex < paragraphLength && <NextParagraph />
      }
      {
        paragraphIndex >= paragraphLength &&
        <>
          <RestartPassage />
          <ExitPassage />
        </>
      }
    </>
  )
}