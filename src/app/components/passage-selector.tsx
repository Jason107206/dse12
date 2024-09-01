import { Database } from "@/database/database"
import { Done } from "@mui/icons-material"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { PassageContext } from "../page"

const PassageSelect = (
  {
    setIndex
  }: {
    setIndex: Dispatch<SetStateAction<number | null | undefined>>
  }
) => {
  const handleChange = (
    event: SelectChangeEvent<unknown>
  ) => {
    const input = event.target.value as string
    setIndex(input !== null ? parseInt(input) : null)
  }

  return (
    <FormControl fullWidth>
      <InputLabel
        id="passage_select_label"
      >
        篇章
      </InputLabel>
      <Select
        labelId="passage_select_label"
        label="篇章"
        onChange={event => handleChange(event)}
      >
        {
          Database.map((x, i) =>
            <MenuItem
              key={i}
              value={i}
            >
              {x.title}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}

const PassageSelector = () => {
  const { setPassage } = useContext(PassageContext)
  const [index, setIndex] = useState<number | null>()

  const handleClick = () => {
    setPassage(index !== null ? Database[index!] : null)
  }

  return (
    <div
      className="h-full p-8 flex flex-col justify-center gap-8"
    >
      <PassageSelect
        setIndex={setIndex}
      />
      <Button
        size="large"
        variant="contained"
        disabled={index == null}
        startIcon={<Done />}
        onClick={handleClick}
      >
        選擇
      </Button>
    </div>
  )
}

export default PassageSelector