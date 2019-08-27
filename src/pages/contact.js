import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import styled from 'styled-components'

import {
	Container,
	Header,
	Segment,
} from 'semantic-ui-react'
import { Form } from 'semantic-styled-ui'

const ContactInfo = styled(Header.Content)`
	padding-top: 2.25em;
`

const Contact = ({ data }) => {
	const { header, body, content } = data.contentfulPage

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{header}</title>
			</Helmet>

			<Container text textAlign='justified'>
				<Header as='h1'>{header}</Header>
				<Header.Content>{richTextToJsx(body?.json)}</Header.Content>
			</Container>

			<Container text>
				<Form
					name={content[0]?.name}
					fields={content[0]?.inputs}
					textArea={content[0]?.textArea}
					button={content[0]?.button}
				/>
				<ContactInfo forwardedAs='address'>
					{richTextToJsx(content[0]?.info?.json)}
				</ContactInfo>
			</Container>
		</Segment>
	)
}

export default React.memo(Contact)

export const pageQuery = graphql`
	query {
		contentfulPage(title: {eq: "Contact"}) {
			...PageFragment
			content {
				... on ContentfulForm {
					name
					inputs
					textArea
					button
					info {
						json
					}
				}
			}
		}
	}
`
