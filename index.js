var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var playground = require('graphql-playground/middleware').express;
var schema = require('./schema');

var graphql = require('graphql');
var createServer = require('http').createServer;
var SubscriptionServer = require('subscriptions-transport-ws').SubscriptionServer;

// 配置express服务器
var app = express();
app.use('/graphql', // 传入定义好的Schema
        cors(),
        graphqlHTTP({
            schema: schema,
            pretty: true
        }))
    .use('/playground', // 配置GraphQL Playground
        playground({
            endpoint: '/graphql',
            subscriptionEndpoint: 'ws://localhost:3000/subscriptions'
        }));

// GraphQL服务运行起来后，配置websocket服务器处理订阅操作
var server = createServer(app);
server.listen(3000, function() {
    console.log('GraphQL server running on http://localhost:3000/graphql');
    new SubscriptionServer({
        execute: graphql.execute,
        subscribe: graphql.subscribe,
        schema: schema,
    }, {
        server: server,
        path: '/subscriptions',
    });
});