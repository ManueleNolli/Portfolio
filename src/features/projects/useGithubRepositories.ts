import { useCallback, useEffect, useState } from 'react'
import { config } from '@/config'

export type Repository = {
  name: string
  url: string
  description: string
  owned: boolean // If I own the repository
  isFork: boolean
  updatedAt: Date
  ownerName: string
  ownerUrl: string
}

type RepositoriesPage = { repos: Repository[]; afterCursor: string | null }

async function fetchRepositoriesPage(afterCursor: string | null): Promise<RepositoriesPage> {
  const params = new URLSearchParams({ projectRepositoriesLength: String(config.githubPageSize) })
  if (afterCursor) params.set('afterCursor', afterCursor)

  const response = await fetch(`${config.api.github}?${params}`, { headers: { 'Content-Type': 'application/json' } })
  if (!response.ok) {
    throw new Error('Error fetching repositories')
  }

  const page = (await response.json()) as RepositoriesPage
  return { ...page, repos: page.repos.map((repo) => ({ ...repo, updatedAt: new Date(repo.updatedAt) })) }
}

export default function useGithubRepositories() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [nextFetchCursor, setNextFetchCursor] = useState<string | null>(null)
  const [loadingStart, setLoadingStart] = useState(true)
  const [loadingNext, setLoadingNext] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // appends the page after `cursor` (null = first page)
  const loadPage = useCallback(async (cursor: string | null) => {
    try {
      const page = await fetchRepositoriesPage(cursor)
      setRepos((previous) => (cursor ? [...previous, ...page.repos] : page.repos))
      setNextFetchCursor(page.afterCursor)
    } catch (e) {
      setError(e as Error)
    }
  }, [])

  const loadFirstPage = useCallback(async () => {
    setLoadingStart(true)
    await loadPage(null)
    setLoadingStart(false)
  }, [loadPage])

  const fetchNextRepositories = async () => {
    setLoadingNext(true)
    await loadPage(nextFetchCursor)
    setLoadingNext(false)
  }

  const reset = () => {
    setError(null)
    setNextFetchCursor(null)
    loadFirstPage()
  }

  useEffect(() => {
    loadFirstPage()
  }, [loadFirstPage])

  return { repos, loadingStart, loadingNext, nextFetchCursor, fetchNextRepositories, error, reset }
}
