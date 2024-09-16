/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'fetcher',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					profile: input.stage === 'production' ? 'axwfetcher-prod' : 'axwfetcher-dev'
				}
			}
		};
	},
	async run() {
		new sst.aws.SvelteKit('MyWeb');
	}
});
