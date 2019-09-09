import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import { Blurbs, Hero } from 'semantic-styled-ui'
import styled from 'styled-components'

import GImage from 'gatsby-image'

import {
	Container,
	Header,
	Segment,
} from 'semantic-ui-react'

const S = {}

/* background overlay to dim and saturate */
S.Blurb = styled(Blurbs.Item)`
	color: white;
	.header {
		color: white;
	}
	.content {
		font-size: 1.25em;
	}
  &::before {
    content: "";
    height: 100%;
    width: 100.5%;
    background: ${({ overlay }) => overlay};
    filter: saturate(2) sepia(0.4) alpha(opacity=85);
		opacity: 0.85;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center +45%;
    top: 0;
    left: -0.5%;
    position: absolute;
    z-index: 6;
  }
`

S.Hero = styled(Hero)`
	margin: 0 20px 1em calc(20px + 0.5%);
`

const Services = ({ data }) => {
	const { header, body, content } = data.contentfulPage

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{header}</title>
			</Helmet>

			<Container textAlign='justified'>
				<Header.Content>{richTextToJsx(body?.json)}</Header.Content>
			</Container>

			{content
				.filter(banner => banner.internal.type === 'ContentfulBanner')
				.map(banner => (
					<S.Hero
						size='compact'
						title={banner.title}
						key={banner.title}
					>
						{<GImage fluid={banner.image.fluid} alt={banner.title} />}
					</S.Hero>
				))
			}

			<Blurbs padding='compact' fullWidth='gutter'>
				{content
					.filter(blurb => blurb.internal.type === 'ContentfulBlurb')
					.map(blurb => (
						<S.Blurb
							key={blurb.title}
							header={blurb.title}
							overlay={blurb.backgroundOverlayColor}
							backgroundImage={<GImage fluid={blurb.backgroundImage.fluid} />}
						>
							{richTextToJsx(blurb.content?.json)}
						</S.Blurb>
					))}
			</Blurbs>
		</Segment>
	)
}

export default React.memo(Services)

export const pageQuery = graphql`
	query {
		contentfulPage(title: { eq: "Our Services" }) {
			...PageFragment
			content {
				...on ContentfulBlurb {
					title
					content {
						json
					}
					backgroundImage {
						fluid(maxWidth: 500) {
							...GatsbyContentfulFluid_withWebp
						}
					}
					backgroundOverlayColor
					internal {
						type
					}
				}
				...on ContentfulBanner {
					title
					image {
						fluid(maxWidth: 500) {
							...GatsbyContentfulFluid_withWebp
						}
					}
					# overlayColor
					internal {
						type
					}
				}
			}
		}
	}
`
