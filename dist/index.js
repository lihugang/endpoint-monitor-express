"use strict";
exports.__esModule = true;
var express_1 = require("./hooks/express");
var monitor = require("endpoint-monitor");
var logger = new monitor.logger('[Endpoint Monitor] Collection System Info');
logger.info('Endpoint monitor for express version', require('../package.json').version);
module.exports = express_1.expressHook;
//# sourceMappingURL=index.js.map