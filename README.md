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


### ec2 setup

#### public webserver
use Amazon Linux 2 AMI (t2.micro instance)
use `project` key pair

Create a new security group with:
SSH traffic from myIP
and HTTP and HTTPS traffic from internet 

## public webserver

To connect:
connect using SSH:
on the AWS management console, select `connect to instance` and follow the instructions to connect via SSH.
Ensure that you specify the path to your `.pem`