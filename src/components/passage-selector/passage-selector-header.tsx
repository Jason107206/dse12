import { APP_NAME, APP_VERSION } from "@/lib/constants";
import { Style } from "@mui/icons-material";
import { AppBar, Chip, Toolbar, Typography } from "@mui/material";

export default function PassageSelectorHeader() {
  return (
    <AppBar
      position="sticky"
    >
      <Toolbar
        className="justify-center gap-4"
      >
        <Style />
        <Typography
          className="text-xl"
        >
          {APP_NAME}
        </Typography>
        <Chip
          color="secondary"
          label={<Typography>{`Ver. ${APP_VERSION}`}</Typography>}
        />
      </Toolbar>
    </AppBar>
  )
}