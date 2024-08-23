import { Audiotrack, FastForward, FastRewind, Pause, PlayArrow, SkipPrevious, Speed } from "@mui/icons-material"
import { Box, Button, Card, CardContent, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useRef, useState } from "react"

const NarrationPlayer = (
  {
    state,
    src,
    metadata
  }: {
    state: boolean,
    src: string,
    metadata: object
  }
) => {
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const [playingState, setPlayingState] = useState(false)
  const [speedState, setSpeedState] = useState(false)

  const skipToPrevious = () => {
    if (audioPlayer.current!.currentTime > 0) {
      audioPlayer.current!.currentTime = 0
    }
  }

  const rewind = (
    second: number
  ) => {
    if (audioPlayer.current!.currentTime > 0) {
      audioPlayer.current!.currentTime = audioPlayer.current!.currentTime - second
    }
  }

  const forward = (
    second: number
  ) => {
    if (audioPlayer.current!.duration - second > 0) {
      audioPlayer.current!.currentTime = audioPlayer.current!.currentTime + second
    }
  }

  useEffect(() => {
    if (state) navigator.mediaSession.metadata = new MediaMetadata(metadata)
  }, [state])

  useEffect(() => {
    if (playingState) {
      audioPlayer.current!.play()
    } else {
      audioPlayer.current!.pause()
    }
  }, [playingState])

  useEffect(() => {
    if (speedState) {
      audioPlayer.current!.playbackRate = 1.5
    } else {
      audioPlayer.current!.playbackRate = 1
    }
  }, [speedState])

  return (
    <div>
      <div
        className="flex items-center gap-4"
      >
        <Audiotrack color="secondary" />
        <ToggleButtonGroup>
          <ToggleButton
            value
            onChange={skipToPrevious}
          >
            <SkipPrevious />
          </ToggleButton>
          <ToggleButton
            value
            onChange={() => rewind(5)}
          >
            <FastRewind />
          </ToggleButton>
          <ToggleButton
            value
            color="secondary"
            selected={playingState}
            onChange={() => setPlayingState(s => !s)}
          >
            {
              playingState ? <Pause /> : <PlayArrow />
            }
          </ToggleButton>
          <ToggleButton
            value
            onChange={() => forward(5)}
          >
            <FastForward />
          </ToggleButton>
          <ToggleButton
            value
            color="secondary"
            selected={speedState}
            onChange={() => setSpeedState(s => !s)}
          >
            <Speed />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {
        state &&
        <audio
          ref={audioPlayer}
          src={src}
          onPause={() => setPlayingState(false)}
          onEnded={() => setPlayingState(false)}
        />
      }
    </div>
  )
}

export default NarrationPlayer