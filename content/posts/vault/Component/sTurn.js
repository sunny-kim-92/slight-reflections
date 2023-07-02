import React from 'react';
import PageGal from 'components/format/PageGal';
import { StaticQuery, graphql } from 'gatsby';

const STurn = () => (
  <StaticQuery
    query={graphql`{
  vaultarticleJson {
    galleries {
      sTurn {
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
      return <PageGal items={data.vaultarticleJson.galleries.sTurn} num={3} />;
    }}
  />
);

export default STurn;
