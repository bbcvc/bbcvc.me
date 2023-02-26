import Card from './Card'
import CategoryGroup from './CategoryGroup'
import LatestPostsGroup from './LatestPostsGroup'
import TagGroups from './TagGroups'
import Catalog from './Catalog'
import { InfoCard } from './InfoCard'
import { AnalyticsCard } from './AnalyticsCard'
import CONFIG_HEXO from '../config_hexo'
import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import Announcement from './Announcement'
import { useGlobal } from '@/lib/global'

const HexoRecentComments = dynamic(() => import('./HexoRecentComments'))
/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const {
    post, currentCategory, categories, latestPosts, tags,
    currentTag, showCategory, showTag, slot, notice
  } = props

  const { locale } = useGlobal()
  return (
    <div className={'space-y-4 lg:w-80 lg:pt-0 px-2 pt-4'}>
      <InfoCard {...props} />
      {CONFIG_HEXO.WIDGET_ANALYTICS && <AnalyticsCard {...props} />}

      {showCategory && (
        <Card>
          <div className='ml-2 mb-1 '>
            <i className='fas fa-th' /> {locale.COMMON.CATEGORY}
          </div>
          <CategoryGroup
            currentCategory={currentCategory}
            categories={categories}
          />
        </Card>
      )}
      {showTag && (
        <Card>
          <TagGroups tags={tags} currentTag={currentTag} />
        </Card>
      )}
      {CONFIG_HEXO.WIDGET_LATEST_POSTS && latestPosts && latestPosts.length > 0 && <Card>
        <LatestPostsGroup {...props} />
      </Card>}

      <Announcement post={notice}/>

      {BLOG.COMMENT_WALINE_SERVER_URL && BLOG.COMMENT_WALINE_RECENT && <HexoRecentComments/>}

      <div className='sticky top-20'>
        {post && post.toc && post.toc.length > 1 && <Card>
          <Catalog toc={post.toc} />
        </Card>}
        {slot}
      </div>

    </div>
  )
}
