import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'

import {
  Container,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'
import { PortfolioItem, media } from 'semantic-styled-ui'

const TenantRelationships = ({ data }) => {
  const { title, brands } = data.allContentfulTenantRelationships.edges[0].node

  return (
    <Segment as='main' padded vertical basic>
      <Helmet>
        <title>Tenant Relationships</title>
      </Helmet>

      <Container
        css={`
          @media ${media.mobile} {
            max-width: calc(375px + 3em) !important;
          }
        `}
      >
        <Header as='h1'>{title}</Header>
      </Container>
      <Segment padded vertical basic>
        <Container>
          <Grid
            textAlign='center'
            columns={3}
            stackable
            doubling
            relaxed='very'
          >
            {brands.map(brand => (
              <PortfolioItem fill={false} key={brand.name}>
                <GImage
                  fluid={brand.image.fluid}
                  alt={brand.name}
                />
              </PortfolioItem>
            ))}
          </Grid>
        </Container>
      </Segment>
    </Segment>
  )
}

export default React.memo(TenantRelationships)

export const pageQuery = graphql`
  query TenantRelationshipsRoute {
    allContentfulTenantRelationships(sort: { fields: [contentful_id] }) {
      edges {
        node {
          title
          brands {
            name
            image {
              fluid(maxWidth: 500) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
