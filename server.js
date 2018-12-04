const http = require('http');
const moment = require('moment');
const port = process.env.PORT

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server! - ' + moment().format('LLLL'))
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if(err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
