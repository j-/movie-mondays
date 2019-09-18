import * as http from 'http';
import { getData } from './kino';

//create a server object:
http
  .createServer(async function(req, res) {
    const data = await getData();
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Access-Control-Allow-Origin', 'https://5076q.csb.app');
    res.write(JSON.stringify(data, null, 2));
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
