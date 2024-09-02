import { Close, SpatialAudioOff, SportsEsports } from "@mui/icons-material"
import { Box, IconButton, SwipeableDrawer, ToggleButton, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { PassageContext } from "../page"
import NarrationPlayer from "./narration-player"
import { GAME_MATCHNG } from "../constants"

const Paragraph = (
  {
    paragraph
  }: {
    paragraph: string[]
  }
) => {
  return (
    <div>
      {
        paragraph.map((x, i) =>
          <Typography
            className="tracking-wider"
            variant="h6"
            key={i}
          >
            {x}
          </Typography>
        )
      }
    </div>
  )
}

const PassageViewerHeader = (
  {
    isPlaying, showControl, toggleControl
  }: {
    isPlaying: boolean,
    showControl: boolean,
    toggleControl: Dispatch<SetStateAction<boolean>>
  }
) => {
  const { setPassage, setPage } = useContext(PassageContext)

  const handleExit = () => {
    setPassage(null)
  }

  const handleToggleNarration = () => {
    toggleControl(s => !s)
  }

  return (
    <Box
      bgcolor="Background"
      className="px-8 py-6 sticky top-0 flex items-center gap-4"
    >
      <IconButton
        onClick={handleExit}
      >
        <Close />
      </IconButton>
      <div className="flex-grow" />
      <ToggleButton
        value
        color="primary"
        onClick={() => setPage(GAME_MATCHNG)}
      >
        <SportsEsports />
      </ToggleButton>
      <ToggleButton
        value
        color="primary"
        selected={isPlaying || showControl}
        onClick={handleToggleNarration}
      >
        <SpatialAudioOff />
      </ToggleButton>
    </Box>
  )
}

const PassageContentViewer = () => {
  const { passage } = useContext(PassageContext)

  return (
    <>
      {
        passage &&
        <div
          className="p-8 flex flex-grow flex-col gap-8"
        >
          <Typography
            variant="h4"
          >
            {passage.title}
          </Typography>
          {
            passage.content.map((x, i) =>
              <Paragraph key={i} paragraph={x} />
            )
          }
        </div>
      }
    </>
  )
}

const PassageViewer = () => {
  const { passage } = useContext(PassageContext)
  const [isPlaying, setPlaying] = useState(false)
  const [showPlayerControl, togglePlayerControl] = useState(false)

  return (
    <>
      {
        passage &&
        <div
          className="h-full flex flex-col overflow-auto"
        >
          <PassageViewerHeader
            isPlaying={isPlaying}
            showControl={showPlayerControl}
            toggleControl={togglePlayerControl}
          />
          <PassageContentViewer />
          <SwipeableDrawer
            anchor="bottom"
            open={showPlayerControl}
            onOpen={() => togglePlayerControl(true)}
            onClose={() => togglePlayerControl(false)}
          >
            <NarrationPlayer
              showPlayerControl={showPlayerControl}
              setPlaying={setPlaying}
            />
          </SwipeableDrawer>
        </div>
      }
    </>
  )
}

export default PassageViewer