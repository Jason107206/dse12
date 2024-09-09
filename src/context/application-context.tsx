import { Passage } from "@/interface/passage-interface"
import { PASSAGE_SELECT } from "@/lib/constants"
import { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useContext, useRef, useState } from "react"

interface ApplicationContextInterface {
  passage: MutableRefObject<Passage>
  page: string
  setPage: Dispatch<SetStateAction<string>>
}

const ApplicationContext = createContext<ApplicationContextInterface>({} as ApplicationContextInterface)

export const ApplicationContextProvider = (
  {
    children
  }: {
    children: ReactNode
  }
) => {
  const passage = useRef(null as unknown as Passage)
  const [page, setPage] = useState(PASSAGE_SELECT)

  return (
    <ApplicationContext.Provider
      value={{
        passage: passage,
        page: page,
        setPage: setPage
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () => useContext(ApplicationContext)