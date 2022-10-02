# Lambda api function 

This lambda function is triggered by a request from an API gateway.

## Setup

This guides you through setting up the lambda, API gateway and DynamoDB integration. 

First setup the lambda function by going to  https://console.aws.amazon.com/lambda and press create a new function.

Let the function name be crud-paper-function
and the execution role be `LabRole`
ensure that the LabRole has the `Simple microservice permissions` in order to grant the lambda function permission to interact with DynamoDB.
In this case I simply assigned the `AmazonDynamoDBFullAccess` policy to LabRole.