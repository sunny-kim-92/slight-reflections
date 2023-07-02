import React from 'react';
import PageGal from 'components/format/PageGal';
import { StaticQuery, graphql } from 'gatsby';

const Direction = () => (
  <StaticQuery
    query={graphql`{
  vaultarticleJson {
    galleries {
      dir {
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
      return <PageGal items={data.vaultarticleJson.galleries.dir} num={2} />;
    }}
  />
);

export default Direction;
