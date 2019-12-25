/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authServerlesstest49152e39UserPoolId = process.env.AUTH_SERVERLESSTEST49152E39_USERPOOLID

Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk');
var region = process.env.REGION
// var storageTeststorageName = process.env.STORAGE_TESTSTORAGE_NAME
var storageTeststorageName = 'Todo-a7k5otiysnhulhtrgtbr6pfcb4-dev'
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
var ddb_table_name = storageTeststorageName
var ddb_primary_key = 'id';

function write(params, context, callback){
  ddb.put(params, function(err, data) {
    if (err) {
      console.log("Error::", err);
      callback(null, "Error::" + err);
    } else {
      console.log("Success::", data);
      callback(null, "Success::" + data);
    }
  });
}
function update(params, context, callback){
  ddb.update(params, function(err, data) {
    if (err) {
      console.log("Error::", err);
      callback(null, "Error::" + err);
    } else {
      console.log("Success::", data);
      callback(null, {id: params.Key.id, name: '', description: ''});
    }
  });
}
function deleteTodoHandler(params, context, callback){
  ddb.delete(params, function(err, data) {
    if (err) {
      console.log("Error::", err);
      callback(null, "Error::" + err);
    } else {
      console.log("Success::", data);
      callback(null, {id: params.Key.id, name: '', description: ''});
    }
  });
}
function getTodoList(params, callback) {
  ddb.scan(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data.Items)
    }
  });
}
function getTodo(params, callback) {
  ddb.get(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data)
    }
  });
}
const resolvers = {
  Query: {
    todosList: (ctx, callback) => {
      var params = {
        TableName: ddb_table_name
      };
      getTodoList(params, (err, data) => {
        if(err) {
          console.log("Error::", err);
          callback(null, ("Error::" + err));
        }
        const resData = {
          items: data,
          nextToken: '12'
        }
        console.log("Success todosList::", resData);
        callback(null, resData);
      });
    },
    getOneTodo: (ctx, callback) => {
      var params = {
        TableName: ddb_table_name,
        Key: {id: Number(ctx.arguments.id)},
      };
      getTodo(params, (err, data) => {
        if(err) {
          console.log("Error::", err);
          callback(null, ("Error::" + err));
        }
        console.log("Success one todo::", data);
        callback(null, data);
      });
    }
  },
  Mutation: {
    createTestTodo: (ctx, callback) => {
      var params = {
        TableName: ddb_table_name,
        Item: {...ctx.arguments, id: ctx.arguments.id}
      };
      if (Object.keys(ctx).length > 0) {
        write(params, ctx, callback);
      }
    },
    updateTestTodo: (ctx, callback) => {
      let description = ctx.arguments.input.description;
      var params = {
        TableName: ddb_table_name,
        Key: {id: ctx.arguments.input.id},
        UpdateExpression: "set description = :description ",
        ExpressionAttributeValues:{
            ":description": description
        },
        ReturnValues:"UPDATED_NEW"
      };
      if (Object.keys(ctx).length > 0) {
        update(params, ctx, callback);
      }
    },
    deleteTestTodo: (ctx, callback) => {
      var params = {
        TableName: ddb_table_name,
        Key: {id: ctx.arguments.input.id}
      };
      if (Object.keys(ctx).length > 0) {
        deleteTodoHandler(params, ctx, callback);
      }
    },
  },
  Subscription: {
    OnUpdateTodoTest: {
      subscribe(ctx, callback) {
        console.log('subscription cts::::', cts);
        callback(null, {id: '123', name: 'todo', description: 'desc todo'})
        setTimeout(() => {
          callback(null, {id: '123', name: 'todo', description: 'desc todo'})
        }, 1000)
      }
    }
  }
}
exports.handler = (event, context, callback) => { //eslint-disable-line
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      resolver(event, callback);
    }
  }
};
