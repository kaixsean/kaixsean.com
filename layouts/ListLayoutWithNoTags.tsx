/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-10 flex items-center justify-center">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        {!prevPage && (
          <button
            className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            disabled={!prevPage}
          >
            <span>Previous</span>
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            <button
              className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
              disabled={!prevPage}
            >
              Previous
            </button>
          </Link>
        )}
        {!nextPage && (
          <button
            className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            <button
              className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
              disabled={!nextPage}
            >
              Next
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div>
            <ul className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, images } = post
                return (
                  <li key={path} className="group cursor-pointer py-3">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
                        <Image
                          src={Array.isArray(images) ? images[0] : ''}
                          width={320}
                          height={320}
                          alt={title}
                          className="object-cover transition-all"
                          sizes="(max-width: 768px) 30vw, 33vw"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="mt-5">
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                          <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight dark:text-white">
                            <Link
                              href={`/${path}`}
                              className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"
                            >
                              {title}
                            </Link>
                          </h2>
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-500 no-underline dark:text-gray-400"
                          >
                            {summary}
                          </Link>
                        </p>
                        <dl className="mt-3 flex items-end text-gray-500 dark:text-gray-400">
                          <dt className="sr-only">Published on</dt>
                          <dd className="truncate text-sm">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
