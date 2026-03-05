import { useEffect, useState } from "react"

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

  // trigger az animációhoz
  useEffect(() => {
    const timeout = setTimeout(() => setShowLetters(true), 100)
    return () => clearTimeout(timeout)
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
    <div className="grid grid-cols-6 grid-rows-6 h-[calc(80vh-100px)] aspect-square max-w-full m-auto gap-0.5">
      {cells.map((letter, i) => {
        let isWord = false
        let delay = 0

        // szó-szintű stagger
        words.forEach(({ text, row, start }, wordIdx) => {
          text.split("").forEach((_, j) => {
            const index = row * 6 + start + j
            if (i === index) {
              isWord = true
              // delay = előző szavak ideje + betűnkénti stagger
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
  )
}

export default NotFoundAnimation