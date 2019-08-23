import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import { Blurbs } from 'semantic-styled-ui'

import {
	Container,
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

			<Blurbs padding='compact'>
				{content.map(blurb => (
					<Blurbs.Item key={blurb.title} header={blurb.title}>
						{richTextToJsx(blurb.content?.json)}
					</Blurbs.Item>
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
				}
			}
		}
	}
`
