import React from 'react';
import PageGal from 'components/format/PageGal';
import { StaticQuery, graphql } from 'gatsby';

const Salto = () => (
  <StaticQuery
    query={graphql`{
  vaultarticleJson {
    galleries {
      salto {
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
      return <PageGal items={data.vaultarticleJson.galleries.salto} num={3} />;
    }}
  />
);

export default Salto;
