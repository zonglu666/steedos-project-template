"use strict";


/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "steedos",

	/**
	 * Settings
	 */
	settings: {
		mongoUrl: process.env.MONGO_URL || 'localhost:27017/steedos',
	},

	/**
	 * Dependencies
	 */
	dependencies: [
		'mongodb',
	],

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
	created() {

	  
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		await this.broker.waitForServices(["mongodb"]);

		const server = require('@steedos/meteor-bundle-runner');
		const steedos = require('@steedos/core');
		
		const logger = this.logger;
		server.Fiber(function () {
			try {
				server.loadServerBundles();
				steedos.init();
				server.callStartupHooks();
				server.runMain();
			} catch (error) {
				logger.error(error)
			}
		}).run();
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
