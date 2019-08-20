import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'
import GImage from 'gatsby-image'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import {
	Footer,
	Navigation,
	getColor,
	getHoverColor,
	media,
} from 'semantic-styled-ui'
import 'semantic-ui-css/semantic.min.css'

const GlobalStyle = createGlobalStyle`
	body {
		font-size: 1em;
		line-height: 1.65em;
		${getColor('dark')};
		margin: 0;
	}

	p {
		line-height: 1.65em !important;
	}

	img {
		display: block;
		width: 100%;
	}

	a {
		${getColor('secondary')};
		${getHoverColor('white')};
	}

	@media ${media.mobile} {
		/* override bad mobile sizing */
		.ui.container.ui.container {
			font-size: 1.1rem !important;
			padding-left: 1.5em !important;
			padding-right: 1.5em !important;
			margin-left: auto !important;
			margin-right: auto !important;
		}
	}

	@media ${media.phone} {
		.ui.container.text.justified {
			text-align: left !important;
		}
	}
`

const Template = ({ children }) => {
	const data = useStaticQuery(graphql`
		query RouteTemplate {
			allContentfulNavigation(sort: {fields: [contentful_id]}) {
				edges {
					node {
						image {
							title
							fixed(width: 215) {
								...GatsbyContentfulFixed_withWebp
							}
						}
						pages
					}
				}
			}

			allContentfulFooter(sort: {fields: [contentful_id]}) {
				edges {
					node {
						company
					}
				}
			}
		}
	`)

	const nav = data.allContentfulNavigation.edges[0].node
	const footer = data.allContentfulFooter.edges[0].node

	const gulfColors = {
		blue: '#172749',
		red: '#fe0000',
		grey: '#5b5b5b',
	}

	return (
		<ThemeProvider theme={{
			...gulfColors,
			primary: gulfColors.blue,
			secondary: 'white',
			accent: gulfColors.red,
		}}
		>
			<div className='root'>
				<Helmet
					defaultTitle='Gulf Corp'
					titleTemplate='Gulf Corp – %s'
				>
					<meta charSet='utf-8' />
					<html lang='en' />
					<meta name='description' content='Real Estate Development & Construction' />
					<meta name='keywords' content='Real Estate, Development, Construction, Property' />
					<meta name='author' content='Austin Ames' />
					<meta itemProp='name' content='Gulf Corp' />
					<meta itemProp='url' content='https://gulfcorpusa.com/' />
					<meta itemProp='telephone' content='469.560.3010' />
					<meta itemProp='email' content='info@gulfcorpusa.com' />
				</Helmet>

				<GlobalStyle />
				<Navigation size='large' as={Link}>
					<Navigation.Logo stacked tabIndex='0'>
						<GImage fixed={nav.image.fixed} alt='logo' />
					</Navigation.Logo>

					{nav.pages.map(page => (
						<Navigation.Item key={page} tabIndex='0'>{page}</Navigation.Item>
					))}
				</Navigation>

				{children}

				<Footer
					copyright={footer.company}
					separated
					developerName='Zach Hardesty'
					developerLink='https://zachhardesty.com'
				/>
			</div>
		</ThemeProvider>
	)
}

Template.propTypes = {
	children: PropTypes.node,
}

export default React.memo(Template)
