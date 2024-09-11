import { useApplicationContext } from "@/context/application-context"
import { PASSAGE_SELECT } from "@/lib/constants"
import { Box, Fade } from "@mui/material"
import PassageSelectorHeader from "./passage-selector-header"
import PassageSelectorList from "./passage-selector-list"

export default function PassageSelector() {
  const { page } = useApplicationContext()

  return (
    <Box
      className="h-full flex flex-col overflow-y-auto"
    >
      <PassageSelectorHeader />
      <Fade
        className="flex flex-grow flex-col overflow-y-auto"
        in={page === PASSAGE_SELECT}
      >
        <Box>
          <PassageSelectorList />
        </Box>
      </Fade>
    </Box>
  )
}