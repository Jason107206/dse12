import { Audiotrack, Close } from "@mui/icons-material"
import { Box, IconButton, SwipeableDrawer, ToggleButton, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { PassageContext } from "../page"
import NarrationPlayer from "./narration-player"

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
  const { setPassage } = useContext(PassageContext)

  const handleExit = () => {
    setPassage(null)
  }

  const handleToggleNarration = () => {
    toggleControl(s => !s)
  }

  return (
    <div
      className="flex items-center gap-4"
    >
      <IconButton
        onClick={handleExit}
      >
        <Close />
      </IconButton>
      <div className="flex-grow" />
      <ToggleButton
        value
        color="secondary"
        selected={isPlaying || showControl}
        onClick={handleToggleNarration}
      >
        <Audiotrack />
      </ToggleButton>
    </div>
  )
}

const PassageContentViewer = () => {
  const { passage } = useContext(PassageContext)

  return (
    <>
      {
        passage &&
        <div
          className="p-2 flex flex-grow flex-col gap-8"
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
          <Box
            bgcolor="background.default"
            className="p-6 sticky top-0"
          >
            <PassageViewerHeader
              isPlaying={isPlaying}
              showControl={showPlayerControl}
              toggleControl={togglePlayerControl}
            />
          </Box>
          <div
            className="px-6 pb-6 flex flex-grow flex-col gap-8"
          >
            <PassageContentViewer />
          </div>
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