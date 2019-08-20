import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'

import {
	Container,
	Grid,
	Header,
	Segment,
} from 'semantic-ui-react'
import { media } from 'semantic-styled-ui'

const Services = ({ data }) => {
	const { title, body, content } = data.contentfulPage

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{title}</title>
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
					>
						{content.map(({
							title: contentTitle,
							content: contentBody,
						}) => (
							<div>
								{contentTitle}
								{richTextToJsx(contentBody?.json)}
							</div>
						))}
					</Grid>
				</Container>
			</Segment>
		</Segment>
	)
}

export default React.memo(Services)

export const pageQuery = graphql`
	query {
		contentfulPage(title: { eq: "Our Services" }) {
			title
			body {
				json
			}
			content {
				...on ContentfulService {
					title
					content {
						json
					}
				}
			}
		}
	}
`
