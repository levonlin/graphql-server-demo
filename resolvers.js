/**
 * 定义resolver，数据源为data.json文件
 */
var data = require('./data.json');
var PubSub = require('graphql-subscriptions').PubSub;

var pubsub = new PubSub();

module.exports = {
    Query: {
        user: function(_, args) {
            return data[args.id];
        },
        allUser: function() {
            return data;
        }
    },
    Mutation: {
        createUser: function(_, args) {
            var result = {
                id: data.length + 1,
                name: args.name
            };
            // CREATE
            data.push(result);
            pubsub.publish('userChanged', {
                userChanged: result
            });
            return result;
        },
        deleteUser: function(_, args) {
            // DELETE
            return data.splice(args.id, 1)[0];
        },
        updateUser: function(_, args) {
            var newItem = {
                id: args.id,
                name: args.name
            };
            // UPDATE
            data.splice(args.id, 1, newItem);
            return newItem;
        },
    },
    Subscription: {
        userChanged: {
            subscribe: function () {
                return pubsub.asyncIterator('userChanged')
            }
        }
    }
}