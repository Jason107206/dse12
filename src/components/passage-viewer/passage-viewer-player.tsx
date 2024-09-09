import { useApplicationContext } from "@/context/application-context";
import { usePlayerContext } from "@/context/player-context";
import { timeFormat } from "@/lib/utils";
import { FastForward, FastRewind, Pause, PlayArrow, RepeatOne, Speed } from "@mui/icons-material";
import { AppBar, Box, Fab, Slider, Toolbar, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

const PlayerLoopButton = () => {
  const { loop, toggleLoop } = usePlayerContext()

  return (
    <Fab
      size="small"
      color={loop ? 'secondary' : 'default'}
      onClick={() => toggleLoop(s => !s)}
    >
      <RepeatOne />
    </Fab>
  )
}

const PlayerSpeedButton = () => {
  const { speed, setSpeed } = usePlayerContext()

  return (
    <Fab
      size="small"
      color={speed === 1.25 ? 'secondary' : 'default'}
      onClick={() => setSpeed(s => s === 1 ? 1.25 : 1)}
    >
      <Speed />
    </Fab>
  )
}

const PlayerRewindButton = () => {
  const { rewind } = usePlayerContext()

  return (
    <Fab
      size="medium"
      onClick={() => rewind(5)}
    >
      <FastRewind />
    </Fab>
  )
}

const PlayerForwardButton = () => {
  const { forward } = usePlayerContext()

  return (
    <Fab
      size="medium"
      onClick={() => forward(5)}
    >
      <FastForward />
    </Fab>
  )
}

const PlayerPlayPauseButton = () => {
  const { playing, togglePlaying } = usePlayerContext()

  return (
    <Fab
      color={playing ? 'secondary' : 'default'}
      onClick={() => togglePlaying(s => !s)}
    >
      {playing ? <Pause /> : <PlayArrow />}
    </Fab>
  )
}

const PlayerControlButtonGroup = () => (
  <Box
    className="pt-4 pb-2 flex items-center gap-8"
  >
    <PlayerLoopButton />
    <Box
      className="flex gap-6 items-center"
    >
      <PlayerRewindButton />
      <PlayerPlayPauseButton />
      <PlayerForwardButton />
    </Box>
    <PlayerSpeedButton />
  </Box>
)

const PlayerControlProgressBar = () => {
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
    <Box
      className="py-2 flex flex-grow items-center gap-8"
    >
      <Typography>
        {timeFormat(timeInput)}
      </Typography>
      <Slider
        className="flex-grow"
        color="secondary"
        min={0}
        max={duration}
        value={timeInput}
        onChange={(event, value) => handleChange(value)}
        onChangeCommitted={handleChangeCommited}
      />
      <Typography>
        {timeFormat(duration)}
      </Typography>
    </Box>
  )
}

export default function PassageViewerPlayer() {
  const { passage } = useApplicationContext()
  const { player, playing, speed, loop, togglePlaying, setTime, setDuration } = usePlayerContext()

  useEffect(() => {
    player.current.src = passage.current.audio_src

    navigator.mediaSession.metadata = new MediaMetadata({
      title: passage.current.title,
      artist: passage.current.author
    })

    player.current.onended = () => togglePlaying(false)
    player.current.onpause = () => togglePlaying(false)
    player.current.ontimeupdate = () => setTime(player.current.currentTime)
    player.current.ondurationchange = () => setDuration(player.current.duration)
  }, [])

  useEffect(() => { playing ? player.current.play() : player.current.pause() }, [playing])
  useEffect(() => { player.current.playbackRate = speed }, [speed])
  useEffect(() => { player.current.loop = loop }, [loop])

  return (
    <>
      <AppBar
        position="relative"
      >
        <Toolbar
          className="flex justify-center"
        >
          <PlayerControlButtonGroup />
        </Toolbar>
        <Toolbar>
          <PlayerControlProgressBar />
        </Toolbar>
      </AppBar>
      {
        <>{player.current.nodeValue}</>
      }
    </>
  )
}