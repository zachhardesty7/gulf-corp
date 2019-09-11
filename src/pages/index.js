import React from 'react'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import GImage from 'gatsby-image'

import styled, { withTheme } from 'styled-components'
import { Blurbs, Hero } from 'semantic-styled-ui'

const Slider = styled(Hero)`
	&&& h1 {
		line-height: 1em;
		margin-bottom: 0;
		vertical-align: baseline;
		font-weight: bolder !important;
		font-style: italic;
		font-family: Tahoma, Arial, Helvetica, sans-serif !important;
	}

	&&&	h2 {
		margin-top: 0;
		font-style: italic;
		font-weight: normal;
		font-family: Tahoma, Arial, Helvetica, sans-serif !important;
	}
`

const Index = ({ data, theme }) => {
	const { hero, blurbs } = data.contentfulIndex

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
						{richTextToJsx(blurb.content?.json)}
					</Blurbs.Item>
				))}
			</Blurbs>
		</main>
	)
}

export default React.memo(withTheme(Index))

export const pageQuery = graphql`
	query {
		contentfulIndex {
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
				content {
					json
				}
			}
		}
	}
`

export const pageFragment = graphql`
  fragment PageFragment on ContentfulPage {
		header
		body {
			json
		}
  }
`
