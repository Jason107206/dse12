import { APP_NAME } from "@/lib/constants";
import { Style } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";

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
      </Toolbar>
    </AppBar>
  )
}