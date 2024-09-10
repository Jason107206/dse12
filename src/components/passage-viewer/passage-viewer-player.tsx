import { useApplicationContext } from "@/context/application-context";
import { usePlayerContext } from "@/context/player-context";
import { AppBar, Box, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { PlayerForwardButton, PlayerLoopButton, PlayerPlayPauseButton, PlayerProgressBar, PlayerRewindButton, PlayerSpeedButton } from "./passage-viewer-player-components";

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
          className="pt-4 items-center justify-center gap-4"
        >
          <PlayerRewindButton />
          <PlayerPlayPauseButton />
          <PlayerForwardButton />
        </Toolbar>
        <Toolbar
          className="gap-2"
        >
          <PlayerLoopButton />
          <Box
            className="flex flex-grow items-center gap-4"
          >
            <PlayerProgressBar />
          </Box>
          <PlayerSpeedButton />
        </Toolbar>
      </AppBar>
      {
        <>{player.current.nodeValue}</>
      }
    </>
  )
}