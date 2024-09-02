export const timeFormat = (s: number) =>
  `${s < 600 ? `0${Math.floor(s / 60)}` : Math.floor(s / 60)}:${s % 60 < 10 ? `0${Math.floor(s % 60)}` : Math.floor(s % 60)}`

export const shuffleArray = (array: Array<unknown>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array
}