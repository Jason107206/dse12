import { useApplicationContext } from "@/context/application-context";
import { theme } from "@/context/theme-context";
import { Database } from "@/database/database";
import { Passage } from "@/interface/passage-interface";
import { PASSAGE_VIEW } from "@/lib/constants";
import { Checklist, History } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { ReactNode } from "react";
import PassageListItem from "./passage-selector-listitem";

const PassageListTitle = (
  {
    label, startIcon
  }: {
    label: string,
    startIcon: ReactNode
  }
) => (
  <Box
    className="flex gap-4 items-center"
  >
    <Box
      sx={{
        color: theme.palette.primary.main,
        ...theme.applyStyles('dark', {
          color: theme.palette.secondary.main,
        })
      }}
    >
      {startIcon}
    </Box>
    <Typography
      className="text-lg"
      color="inherit"
    >
      {label}
    </Typography>
  </Box>
)

export default function PassageSelectorList() {
  const { passage, setPage } = useApplicationContext()

  const handleClick = (x: Passage | null) => {
    if (x) passage.current = x
    setPage(PASSAGE_VIEW)
  }

  return (
    <Box
      className="p-6 flex flex-col flex-grow gap-6"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
      {
        passage.current &&
        <>
          <PassageListTitle
            label="繼續學習"
            startIcon={<History />}
          />
          <PassageListItem passage={passage.current} onClick={() => handleClick(null)} />
          <Divider />
        </>
      }
      <PassageListTitle
        label="選擇範文"
        startIcon={<Checklist />}
      />
      {
        Database.map(
          (x, i) => x !== passage.current && <PassageListItem key={i} passage={x} onClick={() => handleClick(x)} />
        )
      }
    </Box>
  )
}