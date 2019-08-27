import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import { Blurbs } from 'semantic-styled-ui'
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

const Services = ({ data }) => {
	const { header, body, content } = data.contentfulPage

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{header}</title>
			</Helmet>

			<Container textAlign='justified'>
				{/* <Header as='h1'>{header}</Header> */}
				<Header.Content>{richTextToJsx(body?.json)}</Header.Content>
			</Container>

			<Blurbs padding='compact' fullWidth='gutter' celled>
				{content.map(blurb => (
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
				}
			}
		}
	}
`
