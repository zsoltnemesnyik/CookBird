import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const getRandomLetter = () =>
  letters[Math.floor(Math.random() * letters.length)]

const words = [
  { text: "404", row: 1, start: 2 },
  { text: "PAGE", row: 3, start: 2 },
  { text: "NOT", row: 4, start: 0 },
  { text: "FOUND", row: 5, start: 1 },
]

const NotFoundAnimation = () => {
  const [showLetters, setShowLetters] = useState(false)
  const [showDiv, setShowDiv] = useState(false)

  // trigger az animációhoz
  useEffect(() => {
    const timeout = setTimeout(() => setShowLetters(true), 3250)

    // kiszámoljuk a max delay-et a szó animációkból
    const lastWord = words[words.length - 1]
    const lastLetterDelay =
      words
        .slice(0, words.length - 1)
        .reduce((sum, w) => sum + w.text.length * 300, 0) +
      lastWord.start * 200 + // kezdő offset
      (lastWord.text.length - 1) * 200 // betűk stagger
    const showDivTimeout = setTimeout(() => setShowDiv(true), 3250 + lastLetterDelay + 500) // 500ms a transition duration

    return () => {
      clearTimeout(timeout)
      clearTimeout(showDivTimeout)
    }
  }, [])

  const cells = Array.from({ length: 36 }, () => getRandomLetter())

  // szó betűk beállítása
  words.forEach(({ text, row, start }) => {
    text.split("").forEach((char, i) => {
      const index = row * 6 + start + i
      cells[index] = char
    })
  })

  return (
    <div className="h-full w-full m-auto flex items-center justify-center flex-wrap gap-8">
      <div className="grid grid-cols-6 grid-rows-6 h-full w-full md:w-auto md:h-[calc(80vh-100px)] aspect-square gap-0.5">
        {cells.map((letter, i) => {
          let isWord = false
          let delay = 0

          words.forEach(({ text, row, start }, wordIdx) => {
            text.split("").forEach((_, j) => {
              const index = row * 6 + start + j
              if (i === index) {
                isWord = true
                const prevWordsTime = words
                  .slice(0, wordIdx)
                  .reduce((sum, w) => sum + w.text.length * 300, 0)
                delay = prevWordsTime + j * 200
              }
            })
          })

          const bgClass = isWord
            ? showLetters
              ? "bg-accent"
              : "bg-accent/30"
            : "bg-accent/30"

          return (
            <span
              key={i}
              className={`text-white font-bold flex items-center justify-center transition-all duration-500 ${bgClass}`}
              style={{
                transitionDelay: isWord ? `${delay}ms` : "0ms",
              }}
            >
              {letter}
            </span>
          )
        })}
      </div>

      <div className={`flex items-center justify-center transition-all duration-500 ${showDiv ? "opacity-100 max-w-[30%] visible" : "max-w-0 opacity-0 invisible"}`}>
        <Button asChild size={"lg"}>
          <Link to="/">
            <ArrowLeft className="mr" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundAnimation