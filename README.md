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

We need to add traffic on the 3000 port (where our react app is running)


Go to the security group used for the ec2 instance and go to inbound rules. select edit inbound rules and add rule:
Custom TCP, Port range 3000 and create rules for anywhere Ipv4 and IPv6.

We can now access the app using http://ami:3000

## public webserver

To connect:
connect using SSH:
on the AWS management console, select `connect to instance` and follow the instructions to connect via SSH.
Ensure that you specify the path to your `.pem`

if this is the first time initalisation:
Install git using 
`sudo yum install git -y`

Then clone this repository with
`git clone https://github.com/hadwi537/UniGuideOnline.git`

(use PAT to allow)

To setup Node.js runtime: 
run: 
1) `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
2) `. ~/.nvm/nvm.sh`
3) `nvm install --lts`

Check installed correctly with 
`node -e "console.log('Running Node.js ' + process.version)"`


Then need to install the app using `npm install` while in the root dir of public-webserver

We can then run npm-start and see page on localhost:3000

### configuration of pm2

First time install:
use command: 
npm install pm2@latest -g
npm install -g serve

then we need to create a build by running:
npm run build 

Then to run the webserver use:
pm2 serve build 3000 --spa 

To ensure it runs on ec2 instance restart use
(Note only need to do this on ec2 instance creation)
pm2 startup
Then copy and past the command in the terminal

### development

Lifecycle outline:
Make changes on local 
Pull changes in ec2 instance (need to npm install , npm run build, pm2 stop all, pm2 serve build 3000 --spa, pm2 startup again after)
If your IP changes, you'll need to update the ssh address in the securtiy group for specified ec2 instance

recompile

## TODO:
