// api.service.js
const SteedosService = require("@steedos/service-steedos");

module.exports = {
    name: "steedos",
    mixins: [SteedosService],
    settings: {
        // Change port setting
		port: process.env.PORT,
		rootUrl: process.env.ROOT_URL 
    }
}