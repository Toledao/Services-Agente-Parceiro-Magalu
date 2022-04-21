module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			}
		],
		'@babel/preset-typescript'
	],
	plugins: [
		['module-resolver', {
			alias: {
				'@config': './src/config',
				'@middlewares': './src/middlewares',
				'@providers': './src/providers',
				'@entities': './src/entities',
				'@repositories': './src/repositories',
				'@usecases': './src/usecases'
			}
		}]
	],
	ignore: [
		'**/*.spec.ts'
	]
};