require('newrelic');
const Koa = require('koa');
const indexRoutes = require('./routes');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = process.env.PORT || 3000;
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});

app.use(bodyParser());
app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
//



