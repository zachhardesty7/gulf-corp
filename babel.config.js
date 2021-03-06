module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				modules: false,
				useBuiltIns: 'usage',
				shippedProposals: true,
				corejs: 2,
				targets: {
					browsers: [
						'>0.25%',
						'not dead',
					],
				},
			},
		],
		[
			'@babel/preset-react',
			{
				useBuiltIns: true,
				pragma: 'React.createElement',
			},
		],
	],
	plugins: [
		'babel-plugin-transform-semantic-ui-react-style-imports',
		[
			'transform-react-remove-prop-types', {
				removeImport: true,
			},
		],
		'@babel/plugin-proposal-optional-chaining',
		[
			'@quickbaseoss/babel-plugin-styled-components-css-namespace',
			{
				cssNamespace: '.root.root.root',
			},
		],
		'@babel/plugin-syntax-dynamic-import',
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
	],
}
