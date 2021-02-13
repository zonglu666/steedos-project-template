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
		mongoUrl: process.env.MONGO_URL,
		mongoOplogUrl: process.env.MONGO_OPLOG_URL,
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

		if (!this.settings.mongoUrl) {
			await this.broker.waitForServices(["mongodb"]);
			this.settings.mongoUrl = process.env.MONGO_URL;
			this.settings.mongoOplogUrl = process.env.MONGO_OPLOG_URL;
		}


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
