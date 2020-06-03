// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  toSwaggerJSON(json) {
    console.log(json);
  },
  openSwaagerServer(port) {
    const root = process.cwd();
    http
      .createServer(function (req, res) {
        const url = req.url;
        const file = path.join(root + '\\node_modules\\egg-router-mapping', url);
        fs.readFile(file, function (err, data) {
          if (err) {
            res.writeHeader(404);
            res.end();
          } else {
            res.writeHeader(200);
            res.write(data);
            res.end();
          }
        });
      })
      .listen(port || 7070);
  }
};
