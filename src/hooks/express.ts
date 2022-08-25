import * as monitor from 'endpoint-monitor';
const cookieParser = require('cookie-parser');
const expressHook = () => {
    const logger = new monitor.logger('endpoint-monitor');
    const usrConfig = monitor.getConfig();
    logger.isOutputToConsole = false;
    logger.outputFilename = usrConfig.collection?.outputPath ?? 'null';

    logger.info('---Starting monitor service---\nType: Express Server');

    const hookRequest = (req: any, res: any, next: Function): void => {
        if (!req.cookies) cookieParser()(req, res, console.log);

        req.requestID = new Date().toISOString() + '.' + Math.random().toString(36).substring(2);
        req.__endpoint_monitor_descriptor = req.cookies.__endpoint_monitor_descriptor || Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        res.requestID = req.requestID;
        //req.ip = req.socket.remoteAddress || req.connection.remoteAddress || req.headers['forwarded'] || req.headers['x-real-ip'];
        logger.info('Receive request ', {
            ip: req.ip,
            request_id: req.requestID,
            client_id: req.__endpoint_monitor_descriptor,
            authorization: req.headers['authorization'],
            method: req.method,
            url: req.url,
            http_header_size: req.socket.bytesRead
        });
        if (!req.cookies['__endpoint_monitor_descriptor']) res.setHeader('Set-Cookie', '__endpoint_monitor_descriptor=' + req.__endpoint_monitor_descriptor + '; httponly');
        //generate id for user

        const native_end_func = res.end;
        res.end = (...args: any[]) => {
            logger.info('Response request ', {
                status: 'ok',
                requestID: req.requestID,
                statusCode: res.statusCode,
                size: res.socket?.writableLength || res.socket?.bytesWritten
            });
            return native_end_func.bind(res, ...args)();
        };

        next();

    };

    return hookRequest;
};

export { expressHook };