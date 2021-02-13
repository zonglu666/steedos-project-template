// api.service.js
const APIService = require("@steedos/service-api");

module.exports = {
    name: "api",
    mixins: [APIService],
    settings: {
        port: 3001,
        routes: [
            {
                path: "/api",

                whitelist: [
                    "greeter.*",
                ],

                aliases: {
                    "GET /hi": "greeter.hello"
                },

                autoAliases: true
            }
        ]
    }
}