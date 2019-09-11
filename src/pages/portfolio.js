import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import GImage from 'gatsby-image'
import styled from 'styled-components'

import {
	Container,
	Grid,
	Header,
	Segment,
} from 'semantic-ui-react'
import { PortfolioItem, media } from 'semantic-styled-ui'

const S = {} // SC namespace

S.Header = styled(Header)`
	color: ${({ color }) => color};
	border-bottom: 3px solid #fe0000;
`

const Portfolio = ({ data }) => {
	const { header, body, content } = data.contentfulPage

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
				<S.Header as='h1' color='#172749'>{header}</S.Header>
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
		contentfulPage(title: {eq: "Portfolio"}) {
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
