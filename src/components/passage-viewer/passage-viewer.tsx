import { useApplicationContext } from "@/context/application-context"
import { PlayerContextProvider } from "@/context/player-context"
import { PASSAGE_VIEW } from "@/lib/constants"
import { Box, Fade } from "@mui/material"
import PassageViewerContent from "./passage-viewer-content"
import PassageViewerHeader from "./passage-viewer-header"
import PassageViewerPlayer from "./passage-viewer-player"

const Main = () => {
  const { page } = useApplicationContext()

  return (
    <Fade
      in={page === PASSAGE_VIEW}
      timeout={300}
    >
      <Box
        className="h-full flex flex-col"
      >
        <PassageViewerHeader />
        <PassageViewerContent />
        <PassageViewerPlayer />
      </Box>
    </Fade>
  )
}

export default function PassageViewer() {
  return (
    <PlayerContextProvider>
      <Main />
    </PlayerContextProvider>
  )
}