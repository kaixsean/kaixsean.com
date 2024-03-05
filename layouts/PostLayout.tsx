import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import TableOfContents from '@/components/TableOfContents'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  body: { raw: string }
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  body,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]
  const { raw } = body

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <header className="pb-6 pt-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="pt-2">
                <div className="flex flex-wrap items-center justify-center space-x-2">
                  <dl>
                    <dt className="sr-only">Authors</dt>
                    <dd>
                      <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                        {authorDetails.map((author) => (
                          <li className="flex items-center space-x-2" key={author.name}>
                            {author.avatar && (
                              <Image
                                src={author.avatar}
                                width={38}
                                height={38}
                                alt="avatar"
                                className="h-6 w-6 rounded-full"
                              />
                            )}
                            <dl className="whitespace-nowrap text-sm font-medium leading-5">
                              <dt className="sr-only">Name</dt>
                              <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                            </dl>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                  <span>/</span>
                  <dl>
                    <dt className="sr-only">Tags</dt>
                    <dd>
                      {tags && (
                        <ul>
                          <li className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </li>
                        </ul>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-100 pb-8 dark:divide-gray-800 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
            </div>
            <aside>
              <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
                <TableOfContents source={raw} />
              </div>
            </aside>
          </div>
          <footer>
            <div>
              {(next || prev) && (
                <div className="flex flex-col gap-8 py-8 text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="basis-6/12">
                      <h2 className="mb-1 text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <span>←</span>
                        <Link href={`/${prev.path}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="basis-6/12">
                      <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400 sm:text-right">
                        Next Article
                      </h2>
                      <div className="flex gap-1 text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400 sm:flex-row-reverse sm:text-right">
                        <span>→</span>
                        <Link href={`/${next.path}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </footer>
          {siteMetadata.comments && (
            <div
              className="divide-y divide-gray-100 py-6 transition-colors dark:divide-gray-800"
              id="comment"
            >
              <Comments slug={slug} />
            </div>
          )}
        </div>
      </article>
    </SectionContainer>
  )
}
