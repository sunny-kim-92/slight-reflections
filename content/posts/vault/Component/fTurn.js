import React from 'react';
import PageGal from 'components/format/PageGal';
import { StaticQuery, graphql } from 'gatsby';

const FTurn = () => (
  <StaticQuery
    query={graphql`{
  vaultarticleJson {
    galleries {
      fTurn {
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
      return <PageGal items={data.vaultarticleJson.galleries.fTurn} num={3} />;
    }}
  />
);

export default FTurn;
