import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 14

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <li key={slug} className="py-3 group cursor-pointer">
                <article>
                  <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
                    <img src={images} className="object-cover transition-all" sizes="(max-width: 768px) 30vw, 33vw" />
                  </div>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <div className="space-y-5 xl:col-span-4">
                      <div className="space-y-2">
                        <div className="mt-5">
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                          <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
                            <Link
                              href={`/blog/${slug}`}
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
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            aria-label="All posts"
          >
            All Posts
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
