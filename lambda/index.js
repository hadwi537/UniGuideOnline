const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /papers/{id}":
        await dynamo
          .delete({
            TableName: "paper_table",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /papers/{id}":
        body = await dynamo
          .get({
            TableName: "paper_table",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /papers":
        body = await dynamo.scan({ TableName: "paper_table" }).promise();
        break;
      case "PUT /papers":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "paper_table",
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name
            }
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
