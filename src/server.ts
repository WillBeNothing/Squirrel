import * as express from 'express';
import * as cookies from 'cookie-parser';

import './database/connections';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(cookies());

app.listen(3333);
