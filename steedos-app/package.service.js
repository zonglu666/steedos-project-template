"use strict";
const project = require('./package.json');
const packageName = project.name;
const servicePackageLoader = require('@steedos/service-package-loader');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * 软件包服务启动后也需要抛出事件。
 */
module.exports = {
	name: `$packages-${packageName}`,
	namespace: "steedos",
	mixins: [servicePackageLoader],
	/**
	 * Settings
	 */
	settings: {
		packagePath: __dirname,
		packageServiceName: `$packages-${packageName}`
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
		// this.broker.waitForServices(serviceName).then(() => {
		// 	//new trigger service: ${serviceName}-$triggers
		// 	this.broker.loadServices("./services", "**/*.service.js");
		// });

		// this.logger.info("It will be called after all dependent services are available.");
		console.log("package.service.js started!!");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
