import { FastForward, FastRewind, Pause, PlayArrow, RepeatOne, Speed } from "@mui/icons-material"
import { Divider, Slider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { createContext, Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { PassageContext } from "../page"

interface PlayerContextType {
  player: RefObject<HTMLAudioElement> | null,
  playing: boolean,
  loop: boolean
  time: number,
  duration: number,
  speed: number,
  togglePlaying: Dispatch<SetStateAction<boolean>>,
  toggleLoop: Dispatch<SetStateAction<boolean>>,
  setTime: Dispatch<SetStateAction<number>>,
  setDuration: Dispatch<SetStateAction<number>>,
  setSpeed: Dispatch<SetStateAction<number>>,
  rewind: (s: number) => void,
  forward: (s: number) => void,
  seekTo: (s: number) => void
}

const PlayerContext = createContext<PlayerContextType>(
  {
    player: null,
    playing: false,
    loop: false,
    time: 0,
    duration: 0,
    speed: 1,
    togglePlaying: () => { },
    toggleLoop: () => { },
    setTime: () => { },
    setDuration: () => { },
    setSpeed: () => { },
    rewind: (s: number) => { },
    forward: (s: number) => { },
    seekTo: (s: number) => { }
  }
)

const PlayerControlProgressBar = () => {
  const { time, duration, seekTo } = useContext(PlayerContext)

  const isSeeking = useRef(false)
  const [timeInput, setTimeInput] = useState(time)

  const format = (s: number) =>
    `${s < 600 ? `0${Math.floor(s / 60)}` : Math.floor(s / 60)}:${s % 60 < 10 ? `0${Math.floor(s % 60)}` : Math.floor(s % 60)}`

  const handleChange = (value: number | number[]) => {
    if (!isSeeking.current) isSeeking.current = true
    setTimeInput(value as number)
  }

  const handleChangeCommited = () => {
    if (isSeeking.current) isSeeking.current = false
    seekTo(timeInput)
  }

  useEffect(() => {
    if (!isSeeking.current) setTimeInput(time)
  }, [time])

  return (
    <div
      className="flex items-center gap-6"
    >
      <Typography>
        {format(timeInput)}
      </Typography>
      <Slider
        color="secondary"
        min={0}
        max={duration}
        value={timeInput}
        onChange={(event, value) => handleChange(value)}
        onChangeCommitted={handleChangeCommited}
      />
      <Typography>
        {format(duration)}
      </Typography>
    </div>
  )
}

const PlayerControlButtonGroup = () => {
  const { playing, speed, loop, setSpeed, toggleLoop, togglePlaying, rewind, forward } = useContext(PlayerContext)

  return (
    <div
      className="flex flex-grow items-center justify-between gap-6"
    >
      <ToggleButton
        value
        color="secondary"
        selected={loop}
        onChange={() => toggleLoop(s => !s)}
      >
        <RepeatOne />
      </ToggleButton>
      <ToggleButtonGroup>
        <ToggleButton
          value
          onChange={() => rewind(5)}
        >
          <FastRewind />
        </ToggleButton>
        <ToggleButton
          value
          color="secondary"
          selected={playing}
          onChange={() => togglePlaying(s => !s)}
        >
          {
            playing ? <Pause /> : <PlayArrow />
          }
        </ToggleButton>
        <ToggleButton
          value
          onChange={() => forward(5)}
        >
          <FastForward />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButton
        value
        color="secondary"
        selected={speed !== 1}
        onChange={() => setSpeed(s => s == 1.25 ? 1 : 1.25)}
      >
        <Speed />
      </ToggleButton>
    </div>
  )
}

const PlayerControl = () => (
  <div
    className="p-6 flex flex-col gap-6"
  >
    <PlayerControlProgressBar />
    <PlayerControlButtonGroup />
  </div>
)

const Player = () => {
  const { passage } = useContext(PassageContext)
  const { player, loop, togglePlaying, setTime, setDuration } = useContext(PlayerContext)

  return (
    <>
      {
        passage &&
        <audio
          ref={player}
          src={passage.audio_src}
          loop={loop}
          onEnded={() => togglePlaying(false)}
          onPause={() => togglePlaying(false)}
          onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
          onDurationChange={event => setDuration(event.currentTarget.duration)}
        />
      }
    </>
  )
}

const NarrationPlayer = (
  {
    showPlayerControl,
    setPlaying
  }: {
    showPlayerControl: boolean,
    setPlaying: Dispatch<SetStateAction<boolean>>
  }
) => {
  const { passage } = useContext(PassageContext)
  const player = useRef<HTMLAudioElement>(null)

  const [playing, togglePlaying] = useState(false)
  const [loop, toggleLoop] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)

  const rewind = (
    second: number
  ) => {
    if (player.current!.currentTime > 0) {
      player.current!.currentTime = player.current!.currentTime - second
    }
  }

  const forward = (
    second: number
  ) => {
    if (player.current!.duration - second > 0) {
      player.current!.currentTime = player.current!.currentTime + second
    }
  }

  const seekTo = (
    second: number
  ) => {
    if (second >= 0 && second <= player.current!.duration) {
      player.current!.currentTime = second
    }
  }

  useEffect(() => {
    if (playing) togglePlaying(false)
    navigator.mediaSession.metadata = new MediaMetadata({
      title: passage?.title,
      artist: passage?.author
    })
  }, [])

  useEffect(() => {
    setPlaying(playing)
    if (playing) {
      player.current!.play()
    } else {
      player.current!.pause()
    }
  }, [playing])

  useEffect(() => {
    player.current!.playbackRate = speed
  }, [speed])

  return (
    <PlayerContext.Provider value={
      {
        player,
        playing,
        speed,
        loop,
        time,
        duration,
        togglePlaying,
        toggleLoop,
        setTime,
        setDuration,
        setSpeed,
        rewind,
        forward,
        seekTo
      }
    }>
      {
        passage &&
        <>
          <Divider />
          {showPlayerControl && <PlayerControl />}
          <Player />
        </>
      }
    </PlayerContext.Provider >
  )
}

export default NarrationPlayer