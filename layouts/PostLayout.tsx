import Comments from '@/components/Comments'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SectionContainer from '@/components/SectionContainer'
import TableOfContents from '@/components/TableOfContents'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import type { Authors, Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { ReactNode } from 'react'

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
  next?: { path: string; title: string; slug: string }
  prev?: { path: string; title: string; slug: string }
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
          <header className="pt-6 pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
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
                      <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
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
                            <dl className="text-sm leading-5 font-medium whitespace-nowrap">
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
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            <dl className="hidden xl:block"></dl>
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
            </div>
            <div>
              <aside className="hidden xl:sticky xl:top-24 xl:col-span-1 xl:block">
                <TableOfContents source={raw} />
              </aside>
            </div>
          </div>
          <footer>
            <div>
              {(next || prev) && (
                <div className="flex flex-col gap-8 py-8 text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="basis-6/12">
                      <h2 className="mb-1 text-xs tracking-wide text-gray-500 uppercase transition-colors dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <span>←</span>
                        <Link href={`/posts/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="basis-6/12">
                      <h2 className="mb-1 text-left text-xs tracking-wide text-gray-500 uppercase transition-colors sm:text-right dark:text-gray-400">
                        Next Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex gap-1 transition-colors sm:flex-row-reverse sm:text-right">
                        <span>→</span>
                        <Link href={`/posts/${next.slug}`}>{next.title}</Link>
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
