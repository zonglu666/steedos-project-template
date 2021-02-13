// api.service.js
const NodeREDService = require("@steedos/service-node-red");
const path = require('path');

module.exports = {
    name: "node-red-test",
    mixins: [NodeREDService],
    settings: {
        port: 5100,
        userDir: path.join(process.cwd(), "steedos-packages", "node-red-test"),
    }
}