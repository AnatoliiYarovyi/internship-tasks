import { resolve as _resolve } from 'path';
import { lib } from 'serverless-webpack';
import * as nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const context = __dirname;
export const mode = lib.webpack.isLocal ? 'development' : 'production';
export const entry = lib.entries;
export const devtool = lib.webpack.isLocal
	? 'eval-cheap-module-source-map'
	: 'source-map';
export const resolve = {
	extensions: ['.mjs', '.json', '.ts'],
	symlinks: false,
	cacheWithContext: false,
	alias: {
		root: __dirname,
		'@': _resolve(__dirname, 'src'),
	},
	plugins: [
		new TsconfigPathsPlugin({
			configFile: './tsconfig.paths.json',
		}),
	],
};
export const optimization = {
	concatenateModules: false,
};
export const target = 'node';
export const externals = [nodeExternals()];
export const module = {
	rules: [
		// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
		{
			test: /\.(tsx?)$/,
			loader: 'ts-loader',
			exclude: [
				[
					_resolve(__dirname, 'node_modules'),
					_resolve(__dirname, '.serverless'),
					_resolve(__dirname, '.webpack'),
				],
			],
			options: {
				transpileOnly: true,
				experimentalWatchApi: true,
			},
		},
	],
};
export const plugins = [];
