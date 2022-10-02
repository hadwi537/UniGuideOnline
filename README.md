# UniGuide

## Idea:

Two webservers running on ec2 instances. One is responsible for the public site, the other for an admin type

backend in DynamoDB

connect to DynamoDB backend using an api 

Run scrapers using a lambda function

api:

API gateway -> lambda -> DynamoDB