import { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useContext, useRef, useState } from "react"

interface PlayerContextType {
  player: MutableRefObject<HTMLAudioElement>,
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

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType)

export const PlayerContextProvider = (
  {
    children
  }: {
    children: ReactNode
  }
) => {
  const player = useRef(new Audio())
  const [playing, togglePlaying] = useState(false)
  const [loop, toggleLoop] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)

  const rewind = (
    second: number
  ) => {
    if (player.current.currentTime > 0) {
      player.current.currentTime = player.current!.currentTime - second
    }
  }

  const forward = (
    second: number
  ) => {
    if (player.current.duration - second > 0) {
      player.current.currentTime = player.current!.currentTime + second
    }
  }

  const seekTo = (
    second: number
  ) => {
    if (second >= 0 && second <= player.current.duration) {
      player.current.currentTime = second
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        player: player,
        playing: playing,
        loop: loop,
        time: time,
        duration: duration,
        speed: speed,
        togglePlaying: togglePlaying,
        toggleLoop: toggleLoop,
        setTime: setTime,
        setDuration: setDuration,
        setSpeed: setSpeed,
        rewind: rewind,
        forward: forward,
        seekTo: seekTo
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = () => useContext(PlayerContext)