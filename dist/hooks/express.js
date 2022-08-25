"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.expressHook = void 0;
var monitor = require("endpoint-monitor");
var cookieParser = require('cookie-parser');
var expressHook = function () {
    var _a, _b;
    var logger = new monitor.logger('endpoint-monitor');
    var usrConfig = monitor.getConfig();
    logger.isOutputToConsole = false;
    logger.outputFilename = (_b = (_a = usrConfig.collection) === null || _a === void 0 ? void 0 : _a.outputPath) !== null && _b !== void 0 ? _b : 'null';
    logger.info('---Starting monitor service---\nType: Express Server');
    var hookRequest = function (req, res, next) {
        if (!req.cookies)
            cookieParser()(req, res, console.log);
        req.requestID = new Date().toISOString() + '.' + Math.random().toString(36).substring(2);
        req.__endpoint_monitor_descriptor = req.cookies.__endpoint_monitor_descriptor || Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        res.requestID = req.requestID;
        logger.info('Receive request ', {
            ip: req.ip,
            request_id: req.requestID,
            client_id: req.__endpoint_monitor_descriptor,
            authorization: req.headers['authorization'],
            method: req.method,
            url: req.url,
            http_header_size: req.socket.bytesRead
        });
        if (!req.cookies['__endpoint_monitor_descriptor'])
            res.setHeader('Set-Cookie', '__endpoint_monitor_descriptor=' + req.__endpoint_monitor_descriptor + '; httponly');
        var native_end_func = res.end;
        res.end = function () {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            logger.info('Response request ', {
                status: 'ok',
                requestID: req.requestID,
                statusCode: res.statusCode,
                size: ((_a = res.socket) === null || _a === void 0 ? void 0 : _a.writableLength) || ((_b = res.socket) === null || _b === void 0 ? void 0 : _b.bytesWritten)
            });
            return native_end_func.bind.apply(native_end_func, __spreadArray([res], __read(args), false))();
        };
        next();
    };
    return hookRequest;
};
exports.expressHook = expressHook;
//# sourceMappingURL=express.js.map