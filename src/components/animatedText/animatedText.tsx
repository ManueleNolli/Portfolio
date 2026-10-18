import useAnimatedText from '@/components/animatedText/useAnimatedText'

type AnimatedTextProps = {
  className: string
  children: string
}
export default function AnimatedText({ className, children }: AnimatedTextProps) {
  useAnimatedText()

  return (
    <div className={'animated-text ' + className} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
      {children}
    </div>
  )
}
