"use strict";
const project = require('./package.json');
const packageName = project.name;
const packageLoader = require('@steedos/service-package-loader');
const serviceName = `$packages-${packageName}`;
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
	name: serviceName,
	namespace: "steedos",
	/**
	 * Settings
	 */
	settings: {
		standardObjectsPackageLoader: {
			path: __dirname,
			name: serviceName
		}
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		async startStandardObjectsPackageLoader() {
			if (this.settings.standardObjectsPackageLoader.path && this.settings.standardObjectsPackageLoader.name) {
				this.standardObjectsPackageLoaderService = this.broker.createService({
					name: this.settings.standardObjectsPackageLoader.name,
					mixins: [packageLoader],
					settings: this.settings.standardObjectsPackageLoader
				});
				this.broker._restartService(this.standardObjectsPackageLoaderService);
			}
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	async created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		await this.startStandardObjectsPackageLoader();
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
