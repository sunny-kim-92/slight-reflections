import React from "react"
import { graphql } from "gatsby"
import HomepageComponent from "@lekoarts/gatsby-theme-minimal-blog/src/components/homepage"

const Homepage = ({ data }) => <HomepageComponent posts={data.allPost.nodes} />

export default Homepage

export const query = graphql`
  query($formatString: String!) {
    allPost(sort: { date: DESC }, limit: 5) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`