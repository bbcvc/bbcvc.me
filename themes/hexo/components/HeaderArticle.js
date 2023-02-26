import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import formatDate from '@/lib/formatDate'
import BLOG from '@/blog.config'

export default function HeaderArticle({ post, siteInfo }) {
  const { locale } = useGlobal()

  if (!post) {
    return <></>
  }
  const headerImage = post?.page_cover ? `url("${post.page_cover}")` : `url("${siteInfo?.pageCover}")`

  const date = formatDate(
    post?.date?.start_date || post?.createdTime,
    locale.LOCALE
  )

  return (
    <div
      id="header"
      className="w-full h-96 relative md:flex-shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat animate__animated animate__fadeIn relative"
      style={{ backgroundImage: headerImage }}
    >
      <header className="animate__slideInDown animate__animated bg-black bg-opacity-70 absolute top-0 w-full h-96 py-10 flex justify-center items-center ">
        <div className='mt-24'>
          {/* 文章Title */}
          <div className="font-bold text-xl shadow-text flex justify-center text-center text-white dark:text-white ">
            {post.title}
          </div>

          <section className="flex-wrap shadow-text flex text-sm justify-center mt-2 text-white dark:text-gray-400 font-light leading-8">
            <div className='dark:text-gray-200'>
              {post.category && <>
                <Link href={`/category/${post.category}`} passHref legacyBehavior>
                  <div className="cursor-pointer mr-2 dark:hover:text-white hover:underline">
                    <i className="mr-1 fas fa-folder-open" />
                    {post.category}
                  </div>
                </Link>
              </>}
            </div>
            <div className='flex justify-center'>
              {post?.type !== 'Page' && (
                <>
                  <Link
                    href={`/archive#${post?.date?.start_date?.substr(0, 7)}`}
                    passHref
                    className="pl-1 mr-2 cursor-pointer hover:underline">

                    {locale.COMMON.POST_TIME}:{date}

                  </Link>
                </>
              )}
              <div className="pl-1 mr-2">
                {locale.COMMON.LAST_EDITED_TIME}: {post.lastEditedTime}
              </div>
            </div>
            {BLOG.ANALYTICS_BUSUANZI_ENABLE && <div className="busuanzi_container_page_pv font-light mr-2">
              <span className="mr-2 busuanzi_value_page_pv" />
              {locale.COMMON.VIEWS}
            </div>}
          </section>
        </div>
      </header>
    </div>
  );
}
