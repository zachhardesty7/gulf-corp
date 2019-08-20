import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import GImage from 'gatsby-image'

import {
	Container,
	Grid,
	Header,
	Segment,
} from 'semantic-ui-react'
import { PortfolioItem, media } from 'semantic-styled-ui'

const TenantRelationships = ({ data }) => {
	const { title, brands } = data.allContentfulTenantRelationships.nodes[0]

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>Tenant Relationships</title>
			</Helmet>

			<Container
				// REVIEW: usage in 4 column grid
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
						columns={4}
						stackable
						doubling
						relaxed
					>
						{brands.map(({ name, image }) => (
							<PortfolioItem fill={false} key={name}>
								<GImage
									style={{ maxHeight: '125px' }}
									imgStyle={{ objectFit: 'contain' }}
									placeholderStyle={{
										maxHeight: '125px',
										objectFit: 'contain',
									}}
									fluid={image.fluid}
									alt={name}
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
			nodes {
				title
				brands {
					name
					image {
						# resizing behavior necessary for setting both maxes
						fluid(maxWidth: 500) {
							...GatsbyContentfulFluid_withWebp
						}
					}
				}
			}
		}
	}
`
