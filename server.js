const http = require('http');
const dns = require('dns');
const port = process.env.PORT

const requestHandler = (request, response) => {
  console.log(request.url)

  if (process.env.VCAP_SERVICES) {
    let vcap_services = JSON.parse(process.env.VCAP_SERVICES),
      host = vcap_services["p.mysql"][0]["credentials"]["hostname"];

    dns.lookup(host, function(err, result) {
      if(err) {
        response.end('something bad happened - ' + err)
        return console.log('something bad happened', err)
      }
      response.end(result)
    })
  }
  else {
    response.end('No MySQL service bound to app');
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if(err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
