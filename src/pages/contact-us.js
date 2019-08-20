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
	const { title, body, content } = data.contentfulPage

	console.log(data)

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{title}</title>
			</Helmet>

			<Container text>
				<Header as='h1'>{title}</Header>
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
		contentfulPage(title: {eq: "Contact Us"}) {
			title
			body {
      	id
    	}
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
