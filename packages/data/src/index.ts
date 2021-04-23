import * as http from 'http';
import { getData } from './kino';

const hostname = process.argv[2] || process.env.HOSTNAME || 'localhost';
const port = Number(process.argv[3] || process.env.PORT || 8080);

http
  .createServer(async (_req, res) => {
    const data = await getData();
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.write(JSON.stringify(data, null, 2));
    res.end();
  })
  .listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}`);
  });
