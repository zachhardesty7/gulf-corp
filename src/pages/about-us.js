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

const S = {} // SC namespace

S.Header = styled(Header)`
	color: ${({ color }) => color};
	border-bottom: 3px solid #fe0000;
`

S.Profiles = styled(Card.Group)`
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
S.Profile = styled(CardTaggedForwardRef)`
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

S.ProfileName = styled(Card.Header)`
	margin-bottom: 0;
`

S.ProfileImage = styled(GImage)`
	height: 300px;
	object-fit: cover;
	object-position: 50% 40%;
`

S.ModalGrid = styled(Grid)`
	@media ${media.mobile} {
		display: flex;
		flex-direction: column;
		align-content: center;

		.column {
			max-width: 400px;
		}
	}
`

S.ModalImage = styled(GImage)`
	object-fit: cover;
	object-position: 50% 10%;
`

S.ModalContact = styled.address`
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
	const { header, body, content	} = data.contentfulPage

	return (
		<Segment as='main' padded vertical basic>
			<Helmet>
				<title>{header}</title>
			</Helmet>

			<Container text textAlign='justified'>
				<S.Header as='h1' color='#172749'>{header}</S.Header>
				<Header.Content>{richTextToJsx(body?.json)}</Header.Content>
			</Container>

			<Segment vertical padded basic>
				<Container>
					<S.Profiles doubling stackable centered itemsPerRow={4}>
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
									<S.Profile forwardedAs='section' link>
										<S.ProfileImage fluid={image.fluid} />
										<Card.Content>
											<S.ProfileName forwardedAs='h3'>{name}</S.ProfileName>
											<Card.Meta as='p'>{job}</Card.Meta>
										</Card.Content>
									</S.Profile>
								)}
							>
								<Modal.Header as='h2'>
									{name}
									<br />
									{job}
								</Modal.Header>
								<Modal.Content scrolling>
									<S.ModalGrid columns={2} stackable>
										<Grid.Column computer={7} textAlign='left'>
											<S.ModalImage centered size='large' fluid={image.fluid} />
											<S.ModalContact>
												<p>{phone}</p>
												<a href={`mailto:${email}`}>{email}</a>
											</S.ModalContact>
										</Grid.Column>
										<Grid.Column computer={9} textAlign='justified'>
											<Modal.Description>
												{richTextToJsx(bio?.json)}
											</Modal.Description>
										</Grid.Column>
									</S.ModalGrid>
								</Modal.Content>
							</Modal>
						))}
					</S.Profiles>
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
