import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'

import styled, { withTheme } from 'styled-components'
import { Blurbs, Hero } from 'semantic-styled-ui'

// TODO: add contentful rich parsing:
// https://www.gatsbyjs.org/packages/@contentful/gatsby-transformer-contentful-richtext

// FIXME: need screenshot of unmodified system
// https://gatsbyjs.org/docs/adding-images-fonts-files/#adding-images-and-fonts
// https://www.gatsbyjs.org/docs/static-folder/
const Slider = styled(Hero)`
  @font-face {
    font-family: 'Franklin Gothic Book';
    /* FIXME: url -> /public/ */
    src: url('../../static/franklin-gothic-book-regular.ttf') format('truetype');
    font-weight: bolder;
    font-display: swap;
  }

  @font-face {
    font-family: 'Eurostile';
    font-style: italic;
    src: url('../../static/eurostile-lt-std-bold-oblique.ttf') format('truetype');
    font-display: swap;
  }

  h1 {
    line-height: 1em;
    margin-bottom: 0;
    vertical-align: baseline;
    font-weight: bolder;
    font-style: italic;
    font-family: 'Franklin Gothic Book', Tahoma, Arial, Helvetica, sans-serif !important;
  }

  h2 {
    margin-top: 0;
    font-style: italic;
    font-weight: normal;
    font-family: 'Eurostile', Tahoma, Arial, Helvetica, sans-serif !important;
  }
`

const Index = ({ data, theme }) => {
  const { hero, blurbs } = data.allContentfulIndex.edges[0].node

  return (
    <main>
      <Slider
        baseline='top'
        size='relaxed'
        underline
        title={hero.title}
        subtitle={hero.subtitle}
      >
        {hero.backgrounds.map(background => (
          <GImage fluid={background.fluid} alt={background.title} key={background.title} />
        ))}
      </Slider>

      <Blurbs color={theme.primary}>
        {blurbs.map(blurb => (
          <Blurbs.Item key={blurb.title} header={blurb.title}>
            {blurb.body?.body}
          </Blurbs.Item>
        ))}

      </Blurbs>
    </main>
  )
}

Index.propTypes = {
  theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

Index.defaultProps = {
  theme: {},
  data: {}
}

export default React.memo(withTheme(Index))

export const pageQuery = graphql`
  query IndexRoute {
    allContentfulIndex(sort: {fields: [contentful_id]}) {
      edges {
        node {
          hero {
            title
            subtitle
            backgrounds {
              title
              fluid(maxWidth: 1920) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
          blurbs {
            title
            body {
              body
            }
          }
        }
      }
    }
  }
`
