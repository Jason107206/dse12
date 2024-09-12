import { useGameContext } from "@/context/game-context"
import GameMatchingOptionListItem from "./game-matching-option"

export default function GameMatchingOptionList() {
  const { options, setSentenceIndex } = useGameContext()

  return (
    options.map((x, i) =>
      <GameMatchingOptionListItem
        key={i}
        index={x}
        onClick={() => setSentenceIndex(i => i + 1)}
      />
    )
  )
}