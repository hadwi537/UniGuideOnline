# Lambda api function 

This lambda function is triggered by a request from an API gateway.

## Setup

This guides you through setting up the lambda, API gateway and DynamoDB integration. 

First setup the lambda function by going to  https://console.aws.amazon.com/lambda and press create a new function.

Let the function name be crud-paper-function
and the execution role be `LabRole`
ensure that the LabRole has the `Simple microservice permissions` in order to grant the lambda function permission to interact with DynamoDB.
In this case I simply assigned the `AmazonDynamoDBFullAccess` policy to LabRole.

Copy and paste the index.js code into the lambda function on the management console and press deploy


### Part 2
create the HTTP API using API Gateway 

1) Sign in to API Gateway
2) Choose create API then use the HTTP API build option.
3) For API Name use crud-paper-api
4) choose next
5) skip configure routes and create the api

#### b

Create api routes

Choose Routes and Create route

for each route we defined, simply add that route with the correct method. in this case, it was

* `GET /papers/{id}`
* `GET /papers`
* `PUT /items`
* `DELETE /items/{id}`

Create an integration.
