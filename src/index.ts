import { expressHook } from './hooks/express';
import * as monitor from 'endpoint-monitor';
const logger = new monitor.logger('[Endpoint Monitor] Collection System Info');
logger.info('Endpoint monitor for express version', require('../package.json').version);
module.exports = expressHook;