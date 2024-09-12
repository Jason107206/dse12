import { useApplicationContext } from "@/context/application-context";
import { useGameContext } from "@/context/game-context";
import { PASSAGE_VIEW } from "@/lib/constants";
import { ArrowBackIos, Replay, SportsEsports } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function GameMatchingHeader() {
  const { passage, setPage } = useApplicationContext()
  const { setOptions } = useGameContext()

  const handleExit = () => {
    setPage(PASSAGE_VIEW)
  }

  const handleRestart = () => {
    setOptions(null as unknown as number[])
  }

  return (
    <AppBar
      position="sticky"
    >
      <Toolbar
        className="justify-between"
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleExit}
        >
          <ArrowBackIos />
        </IconButton>
        <Box
          className="flex items-center gap-4"
        >
          <SportsEsports />
          <Box
            className="flex flex-col items-center"
          >
            <Typography
              className="text-lg"
            >
              {passage.current.title}
            </Typography>
            <Typography
              className="text-xs"
            >
              {passage.current.author}
            </Typography>
          </Box>
        </Box>
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleRestart}
        >
          <Replay />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}