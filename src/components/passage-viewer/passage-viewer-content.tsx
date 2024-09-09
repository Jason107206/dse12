import { useApplicationContext } from "@/context/application-context"
import { theme } from "@/context/theme-context"
import { Box, Typography } from "@mui/material"

const Paragraph = (
  {
    paragraph
  }: {
    paragraph: string[]
  }
) => {
  return (
    <Box
      className="flex flex-col gap-4"
    >
      {
        paragraph.map(
          (x, i) =>
            <Typography
              className="text-xl tracking-wider"
              key={i}
            >
              {x}
            </Typography>
        )
      }
    </Box>
  )
}

export default function PassageViewerContent() {
  const { passage } = useApplicationContext()

  return (
    <Box
      className="p-6 flex flex-grow flex-col gap-12 overflow-y-auto"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
      {
        passage.current.content.map(
          (x, i) => <Paragraph key={i} paragraph={x} />
        )
      }
    </Box>
  )
}