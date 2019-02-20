import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'
import Async from 'react-promise'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components'
import { Blurbs, Hero } from 'semantic-styled-ui'

import { defaultColors, utils } from '../utils'

const Slider = styled(Hero)`
  @font-face {
    font-family: 'Franklin Gothic Book';
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

const Index = ({ data }) => {
  const { hero, blurbs } = data.allContentfulIndex.edges[0].node

  return (
    <>
      <Slider
        baseline='top'
        size='relaxed'
        underline={defaultColors.accent}
        title={hero.title}
        subtitle={hero.subtitle}
      >
        {hero.backgrounds.map(background => (
          <GImage fluid={background.fluid} alt={background.title} key={background.title} />
        ))}
      </Slider>

      <Blurbs color={defaultColors.primary}>
        {blurbs.map(blurb => (
          <Async
            key={utils.toJoinedTitleCase(blurb.title)}
            promise={import('@fortawesome/free-solid-svg-icons')}
            then={icon => (
              <Blurbs.Item
                icon={blurb.icon
                  ? <FontAwesomeIcon icon={icon[`fa${utils.toJoinedTitleCase(blurb.icon)}`]} size='3x' />
                  : null
                }
                header={blurb.title}
                headerColor={defaultColors.primary}
              >
                {blurb.body && blurb.body.body}
              </Blurbs.Item>
            )}
          />
        ))}

      </Blurbs>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

Index.defaultProps = {
  data: {}
}

export default React.memo(Index)

export const dataQuery = graphql`
  query {
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
