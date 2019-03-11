import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'
import { Form, asTag } from 'semantic-styled-ui'

// REVIEW: unsure why bundler is missing this file
import 'semantic-ui-css/components/input.min.css'

const ContactInfoTagged = asTag(Header.Content)
const ContactInfo = styled(ContactInfoTagged)`
  padding-top: 2.25em;
`

const Contact = ({ data }) => {
  const {
    title, form, address, phone
  } = data.allContentfulContact.edges[0].node

  return (
    <Segment as='main' padded vertical basic>
      <Helmet>
        <title>Contact</title>
      </Helmet>

      <Container text>
        <Header as='h1'>{title}</Header>
        <Form
          name={form.name}
          fields={form.inputs}
          textArea={form.textArea}
          button={form.button}
        />
        <ContactInfo tag='address'>
          <p>{address.split('|')[0]}</p>
          <p>{address.split('|')[1]}</p>
          <p>{phone}</p>
        </ContactInfo>
      </Container>
    </Segment>
  )
}

Contact.propTypes = {
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

Contact.defaultProps = {
  data: {}
}

export default React.memo(Contact)

export const pageQuery = graphql`
  query ContactRoute {
    allContentfulContact(sort: { fields: [contentful_id] }) {
      edges {
        node {
          title
          address
          phone
          form {
            name
            inputs
            textArea
          }
        }
      }
    }
  }
`
