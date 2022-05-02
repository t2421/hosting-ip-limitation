import * as functions from 'firebase-functions';
import * as requestIp from 'request-ip';
import * as express from 'express';
import { allowList } from './config/ip'

console.log('ver 0.1')
const app = express();
app.all('/*', (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  const isAllowed = allowList.indexOf(clientIp!) !== -1;
  if (!isAllowed) {
    res.status(404).send(`You cannot access here. Please check your IP. `);
  } else {
    next();
  }
});
app.use(express.static(`${__dirname}/../static/`));
export const webapp = functions.https.onRequest(app);