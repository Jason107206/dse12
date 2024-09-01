import { Checkbox, CheckboxProps, FormControlLabel, Paper, PaperProps, Radio, styled } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SelectableBackgroundProps extends PaperProps {
  selected?: boolean
}

const SelectableBackground = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'selected'
})<SelectableBackgroundProps>(({ theme }) => ({
  borderColor: 'transparent',
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        backgroundColor: theme,
        color: theme.palette.primary.main
      }
    }
  ]
}))

const CheckboxItem = ({
  label, value, selected, paragraph, setParagraph
}: {
  label: string,
  value: unknown,
  selected: boolean,
  paragraph: number[],
  setParagraph: Dispatch<SetStateAction<number[]>>
}) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const index = parseInt(event.target.value)
    if (event.target.checked) {
      setParagraph(p => [...p, index])
    } else {
      setParagraph(p => p.filter(x => x !== index))
    }
  }

  return (
    <SelectableBackground
      className={`px-4 py-1`}
      variant="outlined"
      selected={selected}
    >
      <FormControlLabel
        className="flex last-child:flex-grow"
        label={label}
        value={value}
        control={
          <Checkbox
            color="primary"
            onChange={event => handleChange(event)}
          />
        }
      />
    </SelectableBackground>
  )
}

export default CheckboxItem