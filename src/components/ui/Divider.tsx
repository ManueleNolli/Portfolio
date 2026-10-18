export default function Divider({ className = 'my-10 md:my-4' }: { className?: string }) {
  return <div className={`w-48 h-1 mx-auto border-0 rounded dark:bg-primary-100 ${className}`} />
}
