import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { Skeleton } from 'primereact/skeleton'
import useGithubRepositories, { Repository } from '@/features/projects/useGithubRepositories'
import ErrorFallback from '@/components/ui/ErrorFallback'
import AnimatedOnScroll from '@/components/animation/AnimatedOnScroll'
import { config } from '@/config'

const GRID_CLASS =
  'grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-2 md:gap-y-6 xl:grid-cols-3 xl:gap-x-4 xl:gap-y-8 2xl:grid-cols-4 2xl:gap-x-4 2xl:gap-y-8 justify-items-center mx-[5%]'
const CARD_CLASS = 'w-96 max-w-[90%] md:w-full bg-white/95 flex flex-col p-4 rounded'
const NAME_MAX_LENGTH = 15

const truncate = (text: string, maxLength: number) => (text.length > maxLength ? text.substring(0, maxLength) + '...' : text)
const formatDate = (date: Date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

function RepositoryBadge({ repo }: { repo: Repository }) {
  if (!repo.isFork && repo.owned) return null

  const badge = repo.isFork
    ? { src: '/assets/fork.png', alt: 'Fork', width: 'w-4' }
    : { src: '/assets/collaboration.png', alt: 'Collaboration', width: 'w-8' }
  return (
    <div className="relative">
      <Image src={badge.src} alt={badge.alt} imageClassName={`${badge.width} absolute right-2 top-2`} />
    </div>
  )
}

function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <div className={`${CARD_CLASS} hover:bg-white cursor-pointer h-full`} onClick={() => window.open(repo.url, '_blank')}>
      <RepositoryBadge repo={repo} />
      <div className="p-0 m-2 hover:text-primary-900 text-primary-800 text-2xl font-semibold">{truncate(repo.name, NAME_MAX_LENGTH)}</div>
      <Button
        label={repo.ownerName}
        onClick={(event) => {
          event.stopPropagation()
          window.open(repo.ownerUrl, '_blank')
        }}
        text
        className="p-0 m-2 hover:text-primary-750 hover:bg-transparent text-primary-600 text-left"
      />
      <div className="m-2 text-gray-500 grow">{repo.description}</div>
      <div className="m-2 text-gray-500">{formatDate(repo.updatedAt)}</div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className={`${GRID_CLASS} py-4`}>
      {Array.from({ length: config.githubPageSize }).map((_, index) => (
        <div key={index} className={`${CARD_CLASS} max-h-96 min-h-80`}>
          <Skeleton className="p-0 m-2 bg-gray-200 min-h-10 rounded animate-pulse" width="80%" />
          <Skeleton className="p-0 m-2 bg-gray-200 min-h-8 rounded" width="50%" />
          <Skeleton className="p-0 m-2 bg-gray-200 min-h-32 rounded" width="90%" />
          <Skeleton className="p-0 m-2 bg-gray-200 min-h-8 rounded" width="25%" />
        </div>
      ))}
    </div>
  )
}

export default function GithubRepositories() {
  const { repos, loadingStart, loadingNext, nextFetchCursor, error, reset, fetchNextRepositories } = useGithubRepositories()

  if (error) return <ErrorFallback error={error} reset={reset} />
  if (loadingStart) return <SkeletonGrid />

  return (
    <AnimatedOnScroll animationStart="top-bottom">
      <div className={GRID_CLASS}>
        {repos.map((repo) => (
          <RepositoryCard key={repo.url} repo={repo} />
        ))}
      </div>
      {loadingNext && <SkeletonGrid />}

      {nextFetchCursor && (
        <div className="flex justify-center">
          <Button
            className="text-white bg-primary-600 hover:bg-transparent rounded-md text-lg m-8 border-1 border-primary-500"
            onClick={fetchNextRepositories}
          >
            <div className="flex items-center justify-center w-full">Load More</div>
          </Button>
        </div>
      )}
    </AnimatedOnScroll>
  )
}
