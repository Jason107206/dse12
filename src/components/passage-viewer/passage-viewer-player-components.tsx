import { usePlayerContext } from "@/context/player-context"
import { timeFormat } from "@/lib/utils"
import { FastForwardRounded, FastRewindRounded, Forward5, Pause, PlayArrow, RepeatOneRounded, Replay5, Speed } from "@mui/icons-material"
import { Fab, IconButton, Slider, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"

export const PlayerLoopButton = () => {
  const { loop, toggleLoop } = usePlayerContext()

  return (
    <IconButton
      color={loop ? 'secondary' : 'inherit'}
      edge="start"
      onClick={() => toggleLoop(s => !s)}
    >
      <RepeatOneRounded />
    </IconButton>
  )
}

export const PlayerSpeedButton = () => {
  const { speed, setSpeed } = usePlayerContext()

  return (
    <IconButton
      color={speed === 1.25 ? 'secondary' : 'inherit'}
      edge="end"
      onClick={() => setSpeed(s => s === 1 ? 1.25 : 1)}
    >
      <Speed />
    </IconButton>
  )
}

export const PlayerRewindButton = () => {
  const { rewind } = usePlayerContext()

  return (
    <IconButton
      color="inherit"
      onClick={() => rewind(5)}
    >
      <Replay5 fontSize="large" />
    </IconButton>
  )
}

export const PlayerForwardButton = () => {
  const { forward } = usePlayerContext()

  return (
    <IconButton
      color="inherit"
      onClick={() => forward(5)}
    >
      <Forward5 fontSize="large" />
    </IconButton>
  )
}

export const PlayerPlayPauseButton = () => {
  const { playing, togglePlaying } = usePlayerContext()

  return (
    <Fab
      color={playing ? 'secondary' : 'default'}
      size="medium"
      onClick={() => togglePlaying(s => !s)}
    >
      {playing ? <Pause /> : <PlayArrow />}
    </Fab>
  )
}

export const PlayerProgressBar = () => {
  const { time, duration, seekTo } = usePlayerContext()

  const isSeeking = useRef(false)
  const [timeInput, setTimeInput] = useState(time)

  const handleChange = (value: number | number[]) => {
    isSeeking.current = true
    setTimeInput(value as number)
  }

  const handleChangeCommited = () => {
    isSeeking.current = false
    seekTo(timeInput)
  }

  useEffect(() => {
    if (!isSeeking.current) setTimeInput(time)
  }, [time])

  return (
    <>
      <Typography
        className="text-sm"
      >
        {timeFormat(timeInput)}
      </Typography>
      <Slider
        className="flex-grow"
        color="secondary"
        size="small"
        min={0}
        max={duration}
        value={timeInput}
        onChange={(event, value) => handleChange(value)}
        onChangeCommitted={handleChangeCommited}
      />
      <Typography
        className="text-sm"
      >
        {timeFormat(duration)}
      </Typography>
    </>
  )
}