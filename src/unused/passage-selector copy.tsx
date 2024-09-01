/*import { Database } from "@/database/database"
import { Button, FormControl, RadioGroup, Typography } from "@mui/material"
import { ChangeEvent, useState } from "react"
import RadioItem from "./checkbox-item"
import { Done } from "@mui/icons-material"

const PassageSelector = () => {
  const [index, setIndex] = useState<number | null>()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setIndex(value !== null ? parseInt(value) : null)
  }

  return (
    <div
      className="h-full p-8 flex flex-col gap-8"
    >
      <FormControl
        className="flex-grow"
        fullWidth
      >
        <RadioGroup
          name="passage_selector"
          className="flex flex-col gap-1"
          onChange={event => handleChange(event)}
        >
          {
            Database.map((x, i) =>
              <RadioItem
                key={i}
                value={i}
                label={x.title}
                selected={index === i}
              />
            )
          }
        </RadioGroup>
      </FormControl>
      <Button
        size="large"
        variant="contained"
        disabled={index == null}
        startIcon={<Done />}
      >
        選擇
      </Button>
    </div>
  )
}

const ParagraphSelect = ({
  index, paragraph, setParagraph
}: {
  index: number,
  paragraph: number[],
  setParagraph: Dispatch<SetStateAction<number[]>>
}) => {

  return (
    <Paper
      variant="outlined"
    >
      <List>
        {
          Database[index].content.map((x, i) =>
            <ListItem
              key={i}
              value={i}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox
                    checked={paragraph.includes(i)}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`第${(i + 1).toLocaleString("zh-u-nu-hanidec")}段`}
                />
              </ListItemButton>
            </ListItem>
          )
        }
      </List>
    </Paper>
  )
}

export default PassageSelector*/