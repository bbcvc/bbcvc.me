import BLOG from '@/blog.config'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { getPostBlocks } from '@/lib/notion/getPostBlocks'
import { idToUuid } from 'notion-utils'
import { deepClone } from '../utils'
import { getAllCategories } from './getAllCategories'
import getAllPageIds from './getAllPageIds'
import { getAllTags } from './getAllTags'
import getPageProperties from './getPageProperties'
import { mapImgUrl } from './mapImage'

/**
 * 获取博客数据
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount 截取最新文章数量
 * @param categoryCount
 * @param tagsCount 截取标签数量
 * @param pageType 过滤的文章类型，数组格式 ['Page','Post']
 * @returns
 *
 */
export async function getGlobalNotionData({
  pageId = BLOG.NOTION_PAGE_ID,
  from
}) {
  // 获取Notion数据
  const notionPageData = deepClone(await getNotionPageData({ pageId, from }))
  delete notionPageData.block
  delete notionPageData.schema
  delete notionPageData.rawMetadata
  delete notionPageData.pageIds
  delete notionPageData.viewIds
  delete notionPageData.collection
  delete notionPageData.collectionQuery
  delete notionPageData.collectionId
  delete notionPageData.collectionView
  return notionPageData
}

/**
 * 获取最新文章 根据最后修改时间倒序排列
 * @param {*}} param0
 * @returns
 */
function getLatestPosts({ allPages, from, latestPostCount }) {
  const allPosts = allPages.filter(page => page.type === 'Post' && page.status === 'Published')

  const latestPosts = Object.create(allPosts).sort((a, b) => {
    const dateA = new Date(a?.lastEditedTime || a?.createdTime || a?.date?.start_date)
    const dateB = new Date(b?.lastEditedTime || b?.createdTime || b?.date?.start_date)
    return dateB - dateA
  })
  return latestPosts.slice(0, latestPostCount)
}

/**
 * 获取指定notion的collection数据
 * @param pageId
 * @param from 请求来源
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getNotionPageData({ pageId, from }) {
  // 尝试从缓存获取
  const cacheKey = 'page_block_' + pageId
  const data = await getDataFromCache(cacheKey)
  if (data && data.pageIds?.length > 0) {
    console.log('[命中缓存]:', `from:${from}`, `root-page-id:${pageId}`)
    return data
  }
  const pageRecordMap = await getPageRecordMapByNotionAPI({ pageId, from })
  // 存入缓存
  if (pageRecordMap) {
    await setDataToCache(cacheKey, pageRecordMap)
  }
  return pageRecordMap
}

/**
 * 获取用户自定义单页菜单
 * @param notionPageData
 * @returns {Promise<[]|*[]>}
 */
function getCustomNav({ allPages }) {
  const customNav = []
  if (allPages && allPages.length > 0) {
    allPages.forEach(p => {
      if (p?.status === 'Published' && p?.type === 'Page') {
        if (p?.slug?.indexOf('http') === 0) {
          customNav.push({ icon: p.icon || null, name: p.title, to: p.slug, show: true })
        } else {
          customNav.push({ icon: p.icon || null, name: p.title, to: '/' + p.slug, show: true })
        }
      }
    })
  }
  return customNav
}

/**
 * 获取标签选项
 * @param schema
 * @returns {undefined}
 */
function getTagOptions(schema) {
  if (!schema) return {}
  const tagSchema = Object.values(schema).find(e => e.name === BLOG.NOTION_PROPERTY_NAME.tags)
  return tagSchema?.options || []
}

/**
 * 获取分类选项
 * @param schema
 * @returns {{}|*|*[]}
 */
function getCategoryOptions(schema) {
  if (!schema) return {}
  const categorySchema = Object.values(schema).find(e => e.name === BLOG.NOTION_PROPERTY_NAME.category)
  return categorySchema?.options || []
}

/**
 * 站点信息
 * @param notionPageData
 * @param from
 * @returns {Promise<{title,description,pageCover,icon}>}
 */
function getBlogInfo({ collection, block }) {
  const title = collection?.name?.[0][0] || BLOG.TITLE
  const description = collection?.description ? Object.assign(collection).description[0][0] : BLOG.DESCRIPTION
  const pageCover = collection?.cover ? (mapImgUrl(collection?.cover, block[idToUuid(BLOG.NOTION_PAGE_ID)]?.value)) : BLOG.HOME_BANNER_IMAGE
  let icon = collection?.icon ? (mapImgUrl(collection?.icon, collection, 'collection')) : BLOG.AVATAR
  // 站点图标不能是emoji情
  const emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
  if (emojiPattern.test(icon)) {
    icon = BLOG.AVATAR
  }
  return { title, description, pageCover, icon }
}

async function getNotice(post) {
  if (!post) {
    return null
  }

  post.blockMap = await getPostBlocks(post.id, 'data-notice')
  return post
}

/**
 * 调用NotionAPI获取Page数据
 * @returns {Promise<JSX.Element|null|*>}
 */
async function getPageRecordMapByNotionAPI({ pageId, from }) {
  const pageRecordMap = await getPostBlocks(pageId, from)
  if (!pageRecordMap) {
    return []
  }
  pageId = idToUuid(pageId)
  const block = pageRecordMap.block
  const rawMetadata = block[pageId]?.value
  // Check Type Page-Database和Inline-Database
  if (
    rawMetadata?.type !== 'collection_view_page' &&
        rawMetadata?.type !== 'collection_view'
  ) {
    console.warn(`pageId "${pageId}" is not a database`)
    return null
  }

  const collection = Object.values(pageRecordMap.collection)[0]?.value
  const collectionId = rawMetadata?.collection_id
  const collectionQuery = pageRecordMap.collection_query
  const collectionView = pageRecordMap.collection_view
  const schema = collection?.schema

  const viewIds = rawMetadata?.view_ids
  const collectionData = []
  const pageIds = getAllPageIds(collectionQuery, collectionId, collectionView, viewIds)
  if (pageIds?.length === 0) {
    console.error('获取到的文章列表为空，请检查notion模板', collectionQuery, collection, collectionView, viewIds, pageRecordMap)
  }
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i]
    const value = block[id]?.value
    if (!value) {
      continue
    }
    const properties = (await getPageProperties(id, block, schema, null, getTagOptions(schema))) || null
    if (properties) {
      collectionData.push(properties)
    }
  }

  // 文章计数
  let postCount = 0
  const allPages = collectionData.filter(post => {
    if (post.type === 'Post' && post.status === 'Published') {
      postCount++
    }
    return post &&
            post.type &&
            (post.type === 'Post' || post.type === 'Page') &&
            (post.status === 'Published' || post.status === 'Invisible') &&
            (!post.slug.startsWith('http'))
  })

  // Sort by date
  if (BLOG.POSTS_SORT_BY === 'date') {
    allPages.sort((a, b) => {
      const dateA = new Date(a?.date?.start_date || a.createdTime)
      const dateB = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })
  }

  const notice = await getNotice(collectionData.filter(post => { return post?.type === 'Notice' && post.status === 'Published' })?.[0])
  const categoryOptions = getAllCategories({ allPages, categoryOptions: getCategoryOptions(schema) })
  const tagOptions = getAllTags({ allPages, tagOptions: getTagOptions(schema) })
  const siteInfo = getBlogInfo({ collection, block })
  const customNav = getCustomNav({ allPages: collectionData.filter(post => post.type === 'Page' && post.status === 'Published') })
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 5 })

  return {
    notice,
    siteInfo,
    allPages,
    collection,
    collectionQuery,
    collectionId,
    collectionView,
    viewIds,
    block,
    schema,
    tagOptions,
    categoryOptions,
    rawMetadata,
    customNav,
    postCount,
    pageIds,
    latestPosts
  }
}
