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

const Services = ({ data }) => {
	const { title, body, content } = data.contentfulPage

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{title}</title>
			</Helmet>

			<Container text textAlign='justified'>
				<Header as='h1'>{title}</Header>
				<Header.Content>{richTextToJsx(body?.json)}</Header.Content>
			</Container>

			<Segment padded vertical basic>
				<Container text>
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
