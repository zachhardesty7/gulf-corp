import React from 'react'
import PropTypes from 'prop-types'
import Async from 'react-promise'
import GImage from 'gatsby-image'
import styled from 'styled-components'

import {
  Button,
  Container,
  Header,
  Image,
  Segment
} from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import theme from '../theme'

const HeroSegment = styled(Segment)`
  padding-top: 10em;
  padding-bottom: 5em;

  h1,
  h2 {
    color: ${theme.white};
    font-weight: normal;
  }

  h1 {
    font-size: 4em;
    margin-bottom: 0;
    vertical-align: baseline;
    display: inline-block;
  }

  h2 {
    font-size: 1.7em;
    margin-top: 1em;
  }

  & > img {
    display: block !important;
  }

  /* background overlay to dim and saturate */
  &::before {
    content: "";
    height: 100%;
    width: 100.5%;
    background: linear-gradient(0deg,rgba(0,0,0,0.65),rgba(0,0,0,0.65));
    filter: saturate(2) sepia(0.4);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center +45%;
    top: 0;
    left: -0.5%;
    position: absolute;
    z-index: -1;
  }

  /* REVIEW: button can't be separate styled component due to "as" passing error */
  /* https://github.com/styled-components/styled-components/issues/2129 */
  .hero-button {
    background-color: ${theme.secondary};
    transition: ease-in-out 50ms;

    &:hover {
      transition: ease-in-out 100ms;
      color: ${theme.secondary};
      background-color: ${theme.primary};
    }
  }
`

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: -0.5%;
  height: 100%;
  width: 100.5%;
  z-index: -2;
  /* FIXME: temp fix when not using gatsby image */
  /* & > img { */
    object-fit: cover !important;
    object-position: 50% 50% !important;
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    /* font-family: \'object-fit: cover !important; object-position: 0% 0% !important;\' // needed for IE9+ polyfill */
  /* } */
`

const Logo = styled(GImage)`
  margin-right: 1em;
  vertical-align: bottom;
`

const FAIcon = styled(FontAwesomeIcon)`
  margin-left: .75em;
  vertical-align: bottom;
  width: 1em;
  height: 1em;
`

const Hero = ({
  logo,
  title,
  subtitle,
  background,
  backgroundAlt,
  buttonText,
  buttonProps
}) => (
  <HeroSegment vertical>
    {/* TODO: conditionally display based on prop */}
    {/* background image */}
    {/* {background && (
      <GImage
        fluid={background}
        backgroundColor
        alt={backgroundAlt}
        style={{ position: `absolute` }}
      />
    )} */}

    {background && (
      <BackgroundImage
        src={background}
        backgroundColor
        alt={backgroundAlt}
      />
    )}

    <Container>
      {logo && (
        <Logo fixed={logo} alt='logo' />
      )}
      {title && (
        <Header as='h1' content={title} />
      )}
      {subtitle && (
        <Header as='h2' content={subtitle} />
      )}
      {buttonText && (
        <Button {...buttonProps} className='hero-button'>
          {buttonText}
          <Async
            promise={import('@fortawesome/free-solid-svg-icons/faAngleRight')}
            then={icon => (
              <FAIcon icon={icon.faAngleRight} />
            )}
          />
        </Button>
      )}
    </Container>
  </HeroSegment>
)

Hero.propTypes = {
  logo: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  background: PropTypes.oneOfType([
    PropTypes.element, PropTypes.object
  ]),
  backgroundAlt: PropTypes.string,
  buttonText: PropTypes.string,
  buttonProps: PropTypes.shape({
    basic: PropTypes.bool,
    inverted: PropTypes.bool,
    primary: PropTypes.bool,
    size: PropTypes.string,
    as: PropTypes.func,
    to: PropTypes.string,
    smooth: PropTypes.bool,
    duration: PropTypes.func
  })
}

Hero.defaultProps = {
  logo: null,
  title: '',
  subtitle: '',
  background: null,
  backgroundAlt: '',
  buttonText: '',
  buttonProps: null
}

export default Hero
