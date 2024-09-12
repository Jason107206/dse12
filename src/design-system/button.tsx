import { theme } from "@/context/theme-context";
import { Button, ButtonProps, styled } from "@mui/material";

export const UIButton = styled(Button)<ButtonProps>(() => ({
  paddingBottom: '1rem',
  paddingTop: '1rem',
  variants: [
    {
      props: ({ variant }) => variant === 'contained' || variant === 'outlined',
      style: {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem'
      }
    },
    {
      props: ({ variant }) => variant === 'text',
      style: {
        backgroundColor: ''
      }
    },
    {
      props: ({ color }) => color === 'primary',
      style: {
        ...theme.applyStyles('dark', {
          color: theme.palette.secondary.main,
        })
      }
    }
  ]
}))