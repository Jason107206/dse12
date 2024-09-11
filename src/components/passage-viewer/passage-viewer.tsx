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
    <Box
      className="h-full flex flex-col"
    >
      <PassageViewerHeader />
      <Fade
        className="flex flex-grow flex-col overflow-y-auto"
        in={page === PASSAGE_VIEW}
      >
        <Box>
          <PassageViewerContent />
          <PassageViewerPlayer />
        </Box>
      </Fade>
    </Box>
  )
}

export default function PassageViewer() {
  return (
    <PlayerContextProvider>
      <Main />
    </PlayerContextProvider>
  )
}