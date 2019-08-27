import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import GImage from 'gatsby-image'

import {
	Container,
	Grid,
	Header,
	Segment,
} from 'semantic-ui-react'
import { PortfolioItem, media } from 'semantic-styled-ui'

const Portfolio = ({ data }) => {
	const {
		title, header, body, content,
	} = data.contentfulPage

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{header}</title>
			</Helmet>

			<Container
				textAlign='left'
				css={`
					@media ${media.mobile} {
						max-width: calc(375px + 3em) !important;
					}
				`}
			>
				<Header as='h1'>{header}</Header>
				<Header.Content>{richTextToJsx(body?.json)}</Header.Content>
			</Container>
			<Segment padded vertical basic>
				<Container>
					<Grid
						textAlign='center'
						columns={3}
						stackable
						doubling
					>
						{content.map(({ name, location, image }) => (
							<PortfolioItem
								key={`${name}-${location}`}
								title={name}
								subtitle={location}
							>
								<GImage
									fluid={image.fluid}
									alt={`${name}, ${location}`}
								/>
							</PortfolioItem>
						))}
					</Grid>
				</Container>
			</Segment>
		</Segment>
	)
}

export default React.memo(Portfolio)

export const pageQuery = graphql`
	query {
		contentfulPage(title: {eq: "Our Work"}) {
			...PageFragment
    	content {
      	... on ContentfulPiece {
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
`
