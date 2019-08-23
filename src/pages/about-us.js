import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { richTextToJsx } from '@madebyconnor/rich-text-to-jsx'
import GImage from 'gatsby-image'
import styled from 'styled-components'

import {
	Card,
	Container,
	Grid,
	Header,
	Modal,
	Ref,
	Segment,
} from 'semantic-ui-react'

import { getColor, media } from 'semantic-styled-ui'

const Profiles = styled(Card.Group)`
	@media ${media.mobile} {
		padding-top: 0.75em !important;
	}
`

// necessary due to lack of handling of forwarded refs in SUIR
// when rendering a trigger item for Modal (or any Portal)
const CardTaggedForwardRef = React.forwardRef(({ children, ...rest }, ref) => (
	<Ref innerRef={ref}>
		<Card {...rest}>{children}</Card>
	</Ref>
))
const Profile = styled(CardTaggedForwardRef)`
	cursor: pointer;

	@media ${media.desktop} {
		width: calc(30% - 1.5em) !important;
	}

	@media ${media.laptop} {
		width: calc(40% - 1.5em) !important;
	}

	@media ${media.mobile} {
		max-width: 20em;
		margin-left: auto !important;
		margin-right: auto !important;
	}
`

const ProfileName = styled(Card.Header)`
	margin-bottom: 0;
`

const ProfileImage = styled(GImage)`
	height: 300px;
	object-fit: cover;
	object-position: 50% 40%;
`

const ModalGrid = styled(Grid)`
	@media ${media.mobile} {
		display: flex;
		flex-direction: column;
		align-content: center;

		.column {
			max-width: 400px;
		}
	}
`

const ModalImage = styled(GImage)`
	object-fit: cover;
	object-position: 50% 10%;
`

const ModalContact = styled.address`
	padding-top: 1.5em;

	a {
		${getColor('primary')};
		text-decoration: underline;

		&:hover {
			filter: brightness(225%);
		}
	}
`

const About = ({ data }) => {
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

			<Segment vertical padded basic>
				<Container>
					<Profiles doubling stackable centered itemsPerRow={4}>
						{content.map(({
							name, title: job, bio, email, phone, image,
						}) => (
							<Modal
								// impossible to style a modal portalled in
								// due to .root.root.root overrides
								// must use semi-hacky extra root class
								as='section'
								className='root'
								key={name}
								closeIcon
								trigger={(
									<Profile forwardedAs='section' link>
										<ProfileImage fluid={image.fluid} />
										<Card.Content>
											<ProfileName forwardedAs='h3'>{name}</ProfileName>
											<Card.Meta as='p'>{job}</Card.Meta>
										</Card.Content>
									</Profile>
								)}
							>
								<Modal.Header as='h2'>
									{name}
									<br />
									{job}
								</Modal.Header>
								<Modal.Content scrolling>
									<ModalGrid columns={2} stackable>
										<Grid.Column computer={7} textAlign='left'>
											<ModalImage centered size='large' fluid={image.fluid} />
											<ModalContact>
												<p>{phone}</p>
												<a href={`mailto:${email}`}>{email}</a>
											</ModalContact>
										</Grid.Column>
										<Grid.Column computer={9} textAlign='justified'>
											<Modal.Description>
												{richTextToJsx(bio?.json)}
											</Modal.Description>
										</Grid.Column>
									</ModalGrid>
								</Modal.Content>
							</Modal>
						))}
					</Profiles>
				</Container>
			</Segment>
		</Segment>
	)
}

export default React.memo(About)

export const pageQuery = graphql`
	query {
		contentfulPage(title: {eq: "About Us"}) {
			...PageFragment
			content {
      	... on ContentfulCard {
					name
					title
					bio {
						json
					}
					email
					phone
					image {
						title
						fluid(maxWidth: 500) {
							...GatsbyContentfulFluid_withWebp
						}
					}
				}
			}
		}
	}
`
