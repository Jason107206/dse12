import { useApplicationContext } from "@/context/application-context";
import { PASSAGE_VIEW } from "@/lib/constants";
import { ArrowBackIos, Replay, SportsEsports } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function GameMatchingHeader() {
  const { passage, setPage } = useApplicationContext()

  const handleExit = () => {
    setPage(PASSAGE_VIEW)
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
              className="text-lg tracking-wide"
            >
              {passage.current.title}
            </Typography>
            <Typography
              className="text-xs tracking-wide"
            >
              {passage.current.author}
            </Typography>
          </Box>
        </Box>
        <IconButton
          color="inherit"
          edge="end"
        >
          <Replay />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}