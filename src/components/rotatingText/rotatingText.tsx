import useRotatingText from '@/components/rotatingText/useRotatingText'

type RotatingTextProps = {
  className: string
  items: string[]
  intervalMs?: number
}

export default function RotatingText({ className, items, intervalMs }: RotatingTextProps) {
  const { containerRef, current, index } = useRotatingText(items, intervalMs)

  // words are kept nowrap so a long item only wraps between words, never mid-word
  return (
    <div key={index} ref={containerRef} className={className} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
      {current.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mx-[0.3em]">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="rotating-char inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
