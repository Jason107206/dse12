
/*const [passageIndex, setPassageIndex] = useState(0)

const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0)
const [lastParagraphIndex, setLastParagraphIndex] = useState(0)
const [currentParagraph, setCurrentParagraph] = useState([""])

const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
const [lastSentenceIndex, setLastSentenceIndex] = useState(0)
const [options, setOptions] = useState([1])

const [audioSrc, setAudioSrc] = useState("")

const resetOptions = () => {
  let temp_options = [currentSentenceIndex + 1]
  let total_options = lastSentenceIndex > 5 ? 4 : lastSentenceIndex - 1

  while (temp_options.length < total_options) {
    let temp_number = Math.random() * currentParagraph.length
    temp_number = Math.floor(temp_number)

    if (
      temp_options.indexOf(temp_number) == -1 &&
      (
        temp_number < currentSentenceIndex - 1 ||
        temp_number > currentSentenceIndex + 1
      )
    ) temp_options.push(temp_number)
  }

  for (let i = temp_options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp_options[i], temp_options[j]] = [temp_options[j], temp_options[i]];
  }

  setOptions(temp_options)
}

useEffect(() => {
  if (currentParagraphIndex == 0) {
    setCurrentParagraph(Database[passageIndex].content[0])
  } else {
    setCurrentParagraphIndex(0)
  }
  setLastParagraphIndex(Database[passageIndex].content.length - 1)
}, [passageIndex])

useEffect(() => {
  setCurrentSentenceIndex(0)
  setCurrentParagraph(Database[passageIndex].content[currentParagraphIndex])
}, [currentParagraphIndex])

useEffect(() => {
  setLastSentenceIndex(currentParagraph.length - 1)
}, [currentParagraph])

useEffect(() => {
  if (status) resetOptions()
}, [currentSentenceIndex])

useEffect(() => {
  if (status) {
    resetOptions()
  } else {
  }
}, [status])

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 6,
  width: "100%",
  borderRadius: 3,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
  },
}));*/
/*<div
  className="h-full"
>
  <div
    className="p-8 h-full grid"
  >
    {
      !status &&
      <Fade in={!status}>
        <div
          className="flex flex-col items-end justify-center gap-4"
        >
          <FormControl fullWidth>
            <InputLabel
              id="passage_select_label"
            >
              篇章
            </InputLabel>
            <Select
              labelId="passage_select_label"
              label="篇章"
              onChange={event =>
                setPassageIndex(parseInt(event.target.value))
              }
              defaultValue={passageIndex.toString()}
            >
              {
                Database.map((x, i) =>
                  <MenuItem
                    key={i}
                    value={i}
                  >
                    {x.title}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              id="paragraph_select_label"
            >
              段落
            </InputLabel>
            <Select
              labelId="paragraph_select_label"
              label="段落"
              onChange={event =>
                setCurrentParagraphIndex(parseInt(event.target.value))
              }
              value={currentParagraphIndex.toString()}
            >
              {
                Database[passageIndex].content.map((x, i) =>
                  <MenuItem
                    key={i}
                    value={i}
                  >
                    第{(i + 1).toLocaleString("zh-u-nu-hanidec")}段
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
          <Button
            variant={"contained"}
            startIcon={<PlayArrow />}
            onClick={() => setStatus(true)}
          >
            開始
          </Button>
        </div>
      </Fade>
    }
    {
      status &&
      <Fade in={status}>
        <div
          className="grid grid-rows-[auto_1fr]"
        >
          <div
            className="flex justify-between items-center gap-4"
          >
            <IconButton
              onClick={() => setStatus(false)}
            >
              <Close />
            </IconButton>
            <NarrationPlayer
              state={status}
              src={audioSrc}
              metadata={{
                title: Database[passageIndex].title,
                artist: Database[passageIndex].author
              }}
            />
          </div>
          <div
            className="p-2 grid content-evenly gap-8"
          >
            <div
              className="grid gap-2"
            >
              <Typography
                variant="body1"
                className="tracking-wider"
              >
                {
                  currentParagraph[currentSentenceIndex - 1]
                }
              </Typography>
              <Typography
                variant="h4"
                className="tracking-wider"
              >
                {
                  currentParagraph[currentSentenceIndex]
                }
              </Typography>
            </div>
            <div
              className="grid gap-4"
            >
              {
                currentSentenceIndex + 1 <= lastSentenceIndex &&
                options.map((x, i) =>
                  <AnswerOption
                    key={i}
                    label={currentParagraph[x]}
                    isCorrect={x == currentSentenceIndex + 1}
                    index={currentSentenceIndex}
                    onClick={() => setCurrentSentenceIndex(i => i + 1)}
                  />
                )
              }
              {
                currentSentenceIndex + 1 > lastSentenceIndex &&
                <>
                  <Button
                    onClick={() => setCurrentSentenceIndex(0)}
                    startIcon={<RestartAlt />}
                  >
                    重新開始
                  </Button>
                  {
                    currentParagraphIndex + 1 > lastParagraphIndex &&
                    <>
                      <Button
                        onClick={() => setCurrentParagraphIndex(0)}
                        startIcon={<SkipPrevious />}
                      >
                        從頭開始
                      </Button>
                      <Button
                        onClick={() => setStatus(false)}
                        startIcon={<ExitToApp />}
                      >
                        退出
                      </Button>
                    </>
                  }
                  {
                    !(currentParagraphIndex + 1 > lastParagraphIndex) &&
                    <>
                      <Button
                        onClick={() => setCurrentParagraphIndex(i => i + 1)}
                        startIcon={<SkipNext />}
                      >
                        下一段落
                      </Button>
                    </>
                  }
                </>
              }
            </div>
          </div>
          <div
            className="flex gap-2"
          >
            {
              [...Array(Database[passageIndex].content.length)].map((x, i) =>
                <BorderLinearProgress
                  key={i}
                  variant="determinate"
                  value={
                    i < currentParagraphIndex ? 100 : i === currentParagraphIndex ? currentSentenceIndex / lastSentenceIndex * 100 : 0
                  }
                />
              )
            }
          </div>
        </div>
      </Fade>
    }
  </div>
</div>*/