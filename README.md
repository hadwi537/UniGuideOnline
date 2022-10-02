# UniGuide

## Idea:

Two webservers running on ec2 instances. One is responsible for the public site, the other for an admin type

backend in DynamoDB

connect to DynamoDB backend using an api 

Run scrapers using a lambda function

api:

API gateway -> lambda -> DynamoDB


## Setup

Initally, we need to setup the DynamoDB backend.

To do this, open the DynamoDB console at https://console.aws.amazon.com/dynamodb/ and choose create table.
* For the table name we use `paper_table`.
* For Partition key use `id`
and then create.