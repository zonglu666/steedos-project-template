// api.service.js
const MongoDBService = require("@steedos/service-mongodb");

module.exports = {
    name: "mongodb",
    mixins: [MongoDBService],
    settings: {
        // Change debug setting
        debug: true
    },
    actions: {
    }
}