import { theme } from "@/context/theme-context";
import { Passage } from "@/interface/passage-interface";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export default function PassageListItem(
  {
    passage, onClick
  }: {
    passage: Passage,
    onClick: () => void
  }
) {
  return (
    <Button
      sx={{
        color: theme.palette.primary.main,
        ...theme.applyStyles('dark', {
          color: theme.palette.secondary.main,
        })
      }}
      endIcon={<ArrowForwardIos />}
      onClick={onClick}
    >
      <Box
        className="py-2 flex flex-grow gap-2 justify-between items-center"
      >
        <Typography
          className="font-medium"
        >
          {passage.title}
        </Typography>
        <Typography
          className="text-sm"
          color={theme.palette.text.primary}
        >
          {passage.author}
        </Typography>
      </Box>
    </Button>
  )
}