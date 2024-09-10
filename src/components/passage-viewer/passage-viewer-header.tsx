import { useApplicationContext } from "@/context/application-context";
import { usePlayerContext } from "@/context/player-context";
import { GAME_MATCHNG, PASSAGE_SELECT } from "@/lib/constants";
import { ArrowBackIos, SpatialAudioOff, SportsEsports } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function PassageViewerHeader() {
  const { passage, setPage } = useApplicationContext()
  const { player } = usePlayerContext()

  const handleExit = () => {
    player.current.src = ""
    setPage(PASSAGE_SELECT)
  }

  const handleStartGame = () => {
    player.current.src = ""
    setPage(GAME_MATCHNG)
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
          <SpatialAudioOff />
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
          onClick={handleStartGame}
        >
          <SportsEsports />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}