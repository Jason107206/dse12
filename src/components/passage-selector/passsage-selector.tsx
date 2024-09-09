import { useApplicationContext } from "@/context/application-context"
import { PASSAGE_SELECT } from "@/lib/constants"
import { Fade } from "@mui/material"
import PassageSelectorHeader from "./passage-selector-header"
import PassageSelectorList from "./passage-selector-list"

export default function PassageSelector() {
  const { page } = useApplicationContext()

  return (
    <Fade
      in={page === PASSAGE_SELECT}
      timeout={300}
    >
      <div
        className="h-full flex flex-col overflow-y-auto"
      >
        <PassageSelectorHeader />
        <PassageSelectorList />
      </div>
    </Fade>
  )
}