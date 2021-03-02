"use strict";
const project = require('./package.json');
const packageName = project.name;
const servicePackageLoader = require('@steedos/service-package-loader');
const serviceName = `$packages-${packageName}`;
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
	name: serviceName,
	namespace: "steedos",
	mixins: [servicePackageLoader],
	/**
	 * Settings
	 */
	settings: {
		packagePath: __dirname,
		packageServiceName: serviceName
	},

	/**
	 * Dependencies
	 */
	dependencies: ['steedos-server'],

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

	},

	/**
	 * Service created lifecycle event handler
	 */
	async created() {
		// new trigger service: ${package serviceName}-$triggers
		// 扫描trigger.js ，并将trigger转为action 注册${serviceName}-$triggers
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this.broker.waitForServices(serviceName).then(() => {
			this.broker.loadServices("./services", "**/*.service.js");
		});

		this.logger.info("It will be called after all dependent services are available.");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
