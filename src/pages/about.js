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
  Segment
} from 'semantic-ui-react'

import { asTag, getColor, media } from 'semantic-styled-ui'

const Profiles = styled(Card.Group)`
  ${media.mobile`
    padding-top: 0.75em !important;
  `};
`

// necessary due to lack of handling of forwarded refs in SUIR
// when rendering a trigger item for Modal (or any Portal)
const CardTaggedForwardRef = asTag(React.forwardRef(({ children, ...rest }, ref) => (
  <Ref innerRef={ref}>
    <Card {...rest}>{children}</Card>
  </Ref>
)))
const Profile = styled(CardTaggedForwardRef)`
  cursor: pointer;

  ${media.desktop`
    width: calc(30% - 1.5em) !important;
  `};

  ${media.laptop`
    width: calc(40% - 1.5em) !important;
  `};

  ${media.mobile`
    max-width: 20em;
    margin-left: auto !important;
    margin-right: auto !important;
  `};
`

const ProfileNameTagged = asTag(Card.Header)
const ProfileName = styled(ProfileNameTagged)`
  margin-bottom: 0;
`

const ProfileImage = styled(GImage)`
  height: 300px;
  object-fit: cover;
  object-position: 50% 40%;
`

const ModalGrid = styled(Grid)`
  ${media.mobile`
    display: flex;
    flex-direction: column;
    align-content: center;

    .column {
      max-width: 400px;
    }
  `};
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
  const { title, content, cards } = data.allContentfulAbout.edges[0].node

  return (
    <Segment as='main' padded vertical basic>
      <Helmet>
        <title>About</title>
      </Helmet>

      <Container text textAlign='justified'>
        <Header as='h1'>{title}</Header>
        <Header.Content>{richTextToJsx(content?.json)}</Header.Content>
      </Container>

      <Segment vertical padded basic>
        <Container>
          <Profiles doubling stackable centered itemsPerRow={4}>
            {cards.map(card => (
              <Modal
                // impossible to style a modal portalled in
                // due to .root.root.root overrides
                // must use semi-hacky extra root class
                as='section'
                className='root'
                key={card.name}
                closeIcon
                trigger={(
                  <Profile tag='section' link>
                    <ProfileImage fluid={card.image.fluid} />
                    <Card.Content>
                      <ProfileName tag='h3'>{card.name}</ProfileName>
                      <Card.Meta as='p'>{card.title}</Card.Meta>
                    </Card.Content>
                  </Profile>
                )}
              >
                <Modal.Header as='h2'>
                  {card.name}
                  <br />
                  {card.title}
                </Modal.Header>
                <Modal.Content scrolling>
                  <ModalGrid columns={2} stackable>
                    <Grid.Column computer={7} textAlign='left'>
                      <ModalImage centered size='large' fluid={card.image.fluid} />
                      <ModalContact>
                        <p>{card.phone}</p>
                        <a href={`mailto:${card.email}`}>{card.email}</a>
                      </ModalContact>
                    </Grid.Column>
                    <Grid.Column computer={9} textAlign='justified'>
                      <Modal.Description>
                        {richTextToJsx(card.bio?.json)}
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
  query AboutRoute {
    allContentfulAbout(sort: { fields: [contentful_id] }) {
      edges {
        node {
          title
          content {
            json
          }
          cards {
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
  }
`
