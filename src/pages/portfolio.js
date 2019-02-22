import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'

import {
  Segment,
  Container,
  Header,
  Grid
} from 'semantic-ui-react'
import { PortfolioItem } from 'semantic-styled-ui'

import { media, utils } from '../utils'

const Portfolio = ({ data }) => {
  const { title, pieces } = data.allContentfulPortfolio.edges[0].node

  return (
    <Segment padded vertical basic>
      <Helmet>
        <title>Portfolio</title>
      </Helmet>

      <Container css={`
        ${media.mobile`
          max-width: calc(375px + 3em) !important;
        `}
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
          >
            {pieces.map(piece => (
              <PortfolioItem
                key={utils.process(`${piece.name} ${piece.location}`)}
                title={piece.name}
                subtitle={piece.location}
              >
                <GImage
                  fluid={piece.image.fluid}
                  alt={utils.process(`${piece.name} ${piece.location}`)}
                />
              </PortfolioItem>
            ))}
          </Grid>
        </Container>
      </Segment>
    </Segment>
  )
}

Portfolio.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

Portfolio.defaultProps = {
  data: {}
}

export default React.memo(Portfolio)

export const pageQuery = graphql`
  query PortfolioRoute {
    allContentfulPortfolio(sort: { fields: [contentful_id] }) {
      edges {
        node {
          title
          pieces {
            name
            location
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
