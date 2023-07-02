import React from 'react';
import PageGal from 'components/format/PageGal';
import { StaticQuery, graphql } from 'gatsby';

const BP = () => (
  <StaticQuery
    query={graphql`{
  vaultarticleJson {
    galleries {
      bp {
        title
        testimg {
          childImageSharp {
            gatsbyImageData(height: 500, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
}
`}
    render={data => {
      return <PageGal items={data.vaultarticleJson.galleries.bp} num={3} />;
    }}
  />
);

export default BP;
