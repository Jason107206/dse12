import { theme } from "@/context/theme-context";
import { UIButton } from "@/design-system/button";
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
    <UIButton
      endIcon={<ArrowForwardIos />}
      onClick={onClick}
    >
      <Box
        className="flex flex-grow gap-2 justify-between items-center"
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
    </UIButton>
  )
}