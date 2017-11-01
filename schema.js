/**
 * 关联API Schema和对应的resolver
 */
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var resolvers = require('./resolvers');
var schema = require('./schema.graphql');

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
});