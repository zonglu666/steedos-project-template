"use strict";

const pkg = require('@steedos/mongodb-memory-server-core');
const { MongoMemoryReplSet } = pkg;
const path = require('path');
const fs = require('fs');
const dbDirectoryName = 'db';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "mongodb",

	/**
	 * Settings
	 */
	settings: {

		port: process.env.MONGO_PORT || 27018,
		dbPath: process.env.MONGO_DBPATH || path.join(process.cwd(), dbDirectoryName),

		binary: {
			version: '4.2.11',
			downloadDir: path.join(process.cwd(), 'bin/mongodb'),
		},

		replSet: {
		  name: 'rsSteedos',
		  auth: false,
		  args: ['--bind_ip_all'],
		  count: 1,
		  dbName: 'steedos',
		  ip: '127.0.0.1',
		  oplogSize: 1,
		  spawn: {},
		  storageEngine: 'wiredTiger'
		},

		autoStart: true,

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

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

		if (process.env.MONGO_URL) {
			return;
		}

		this.settings.instanceOpts = [
			{
			  port: this.settings.port, 
			  dbPath: this.settings.dbPath,
			},
		];

		if (!fs.existsSync(this.settings.dbPath)) {
			fs.mkdirSync(this.settings.dbPath);
		}

		this.logger.info(`MongoDB port: ${this.settings.port}`);
		this.logger.info(`MongoDB db: ${this.settings.dbPath}`);
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

		if (process.env.MONGO_URL) {
			return;
		}

		this.server = await MongoMemoryReplSet.create(this.settings);
		process.env.MONGO_URL = this.server.getUri();
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
