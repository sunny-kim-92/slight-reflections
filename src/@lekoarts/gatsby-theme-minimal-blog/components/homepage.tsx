/** @jsx jsx */
import { jsx, Heading, Flex } from "theme-ui"
import { HeadFC, Link } from "gatsby"
import Layout from "./layout"
import Listing from "./listing"
import useMinimalBlogConfig from "../src/hooks/use-minimal-blog-config"
import replaceSlashes from "../src/utils/replaceSlashes"
import Seo from "./seo"

export type MBHomepageProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
}

const Homepage = ({ posts }: MBHomepageProps) => {
  const { basePath, tagsPath } = useMinimalBlogConfig()

  return (
    <Layout>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 4 }}>
          Articles
        </Heading>
        <Link
          sx={(t) => ({ ...t.styles?.a, variant: `links.secondary`, marginY: 2 })}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          View all tags
        </Link>
      </Flex>
      <Listing posts={posts} showTags={true} />
    </Layout>
  )
}

export default Homepage

export const Head: HeadFC = () => <Seo />
