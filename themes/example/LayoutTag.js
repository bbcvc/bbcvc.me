import BLOG from '@/blog.config'
import { BlogListPage } from './components/BlogListPage'
import { BlogListScroll } from './components/BlogListScroll'
import LayoutBase from './LayoutBase'

export const LayoutTag = props => {
  return <LayoutBase {...props}>
       {BLOG.POST_LIST_STYLE === 'page' ? <BlogListPage {...props} /> : <BlogListScroll {...props} />}
    </LayoutBase >
}
