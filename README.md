# UniGuideOnline

This project aims to better present the paper options at the University of Otago to allow prospective students to make better informed decisions.

This application is fully hosted in the AWS cloud and follows a conventional 3-tier architecture. There are two virtual machines which host webservers written using the React framework. These webservers interact with a DynamoDB instance via an API composed of an API Gateway and lambda function to retrieve and insert paper information as shown below.

![alt text](https://github.com/hadwi537/UniGuideOnline/blob/master/docs-assets/AWS_architecture.jpg?raw=true)


## Getting Started

### Prerequisites

Download and install the aws-cli for your particular OS.

### Setup & Build

After the aws-cli has installed, open your IDE of choice (I use Visual Studio Code https://code.visualstudio.com/download) and clone the repository.

#### Setup Webservers

To setup the webservers we first navigate to the EC2 console at https://us-east-1.console.aws.amazon.com/ec2/ and select $launch instance$. First, choose the Amazon Linux 2 AMI with a t2.micro instance and a specified key pair. Then create a new security group that allows SSH traffic from myIP, HTTP, HTTPS and custom TCP connections on port 3000 for IPv4 and IPv6 from the internet. This ensures that web users can connect to the React webserver that runs on port 3000. Note that the myIP reference will have to be updated periodically. 

Then we assign elastic IPs to the instances using the Elastic IPs tab under Network and Security. To do this, simply select `Allocate Elastic IP address` and assign each webserver to different Elastic IPs.

Now connect to the webservers by following the instructions under `connect to instance` and run the following sequence of commands. 

*  `sudo yum install git -y` to install git
* `git clone https://github.com/hadwi537/UniGuideOnline.git` to install the application files (using a private access token if required).
* `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
* `. ~/.nvm/nvm.sh`
* `nvm install --lts`
* `node -e "console.log('Running Node.js ' + process.version)` to verify installation.

Now navigate to the root directory of the one of the webservers (public-webserver or admin-webserver) and run `npm install`.

The respective app will now be available on localhost:3000 and from the given elastic IP at http://<elastic-ip>:3000.

We now configure PM2 to automatically start the webservers and leave them running when the terminal is closed through the following commands.

* `npm install pm2@latest -g`
* `npm install -g serve`
* `npm run build` (from the root directory of a webserver)
* `pm2 serve build 3000 --spa`
* copy and paste the output of `pm2 startup` and run it.

#### Setup Backend

First we need to initialize the backend DynamoDB database. To do this, first navigate to https://console.aws.amazon.com/dynamodb/ to bring up the DynamoDB interface. From here, we then create a table named `paper_table` with primary partition key `paper_code`. Note that once created, successive restarts of the AWS learner lab will restart the table automatically, so no further effort is required. 

The data
![alt text](https://github.com/hadwi537/UniGuideOnline/blob/master/docs-assets/paper_erd.PNG?raw=true)

#### API setup

First setup the lambda function by navigating to https://console.aws.amazon.com/lambda and select `create function`. Let the function name be `crud-paper-function`, assign the execution role to `LabRole` and ensure that the `LabRole` has the `Simple microservice permissions`.

Then copy and paste the `index.js` code in `lambda/index.js` into the code on the management console and press deploy.

We then create an HTTP API using API gateway. Navigate to the API Gateway console at https://us-east-1.console.aws.amazon.com/apigateway/ and choose `create API` using the HTTP API blueprint. Use `crud-paper-api` as the name and skip the remaining steps to create the API. 

Now select this API and choose `Routes` under `Develop`. For each route we defined in the lambda function, we add that route with the specified method. In this case: 

* GET /papers/{id} $
* GET /papers/$
* PUT /items$
* DELETE /items/{id}$

Now select `Integrations` and assign the lambda api created in the previous step to every route.

#### Scraper setup

First create an ECR repository from the console https://us-east-1.console.aws.amazon.com/ecr/ and name it scraper-2. To create the image use `docker build -t scraper .` from the scraper directory. 

Then, navigate to the lambda function console and create a lambda function in the usual way. Except, in this case, choose the base image as the image residing in the ECR repository. Then login through docker using `docker login -u AWS -p \$(aws ecr get-login-password --region us-east-1) 426627924972.dkr.ecr.us-east-1.amazonaws.com`, tag the image with `docker tag scraper:latest 426627924972.dkr.ecr.us-east-1.amazonaws.com/scraper-2` and push it to ECR using `docker push 426627924972.dkr.ecr.us-east-1.amazonaws.com/scraper-2`. 
The create a Lambda function in the usual way from the console except that we select the `Container image` option and select the uploaded image using its image URI. For example `426627924972.dkr.ecr.us-east-1.amazonaws.com/scraper-2:latest` as it will always be the latest.
### Development & Deployment

As stated earlier, the DynamoDB requires no further modification. Unless, a more compute intensive option is desired.

In general, I personally recommend making changes locally. For example, since we are using a React web framework, the webservers can be run from the command line using npm-start where changes to the code can be instantly applied by simply saving the project. 

#### Webservers

Assuming that changes have been made and pushed to remote, connect to the ec2 instance hosting the changed webserver. Then, perform the following steps.

* `git pull`
* `npm install` from the root directory of the modified webserver.
* `npm run build`
* `pm2 stop all`
* `pm2 serve build 3000 --spa` 
* copy and paste the output of `pm2 startup` and run it in the terminal.
#### API

For updating the lambda function, navigate to the Lambda function console and copy and paste in the changes.

New API routes can be created by following the steps detailed in the setup section.

#### Scraper

Upon making a change simply rebuild and push the image to ECR using the steps described above. Then update the Lambda function image by using the `Deploy new image` button and selecting the latest image.

### Estimated costs of cloud services
The estimated running costs are detailed below.

In idle conditions, the monthly cost is about $31.55$

With light use, the monthly cost is about $41.38$ where the majority of the cost comes from the DynamoDB database.

## Next steps 

* Create CI/CD pipeline for ec2 instances and lambda api.
* Authorization control and user accounts.
* Cloud front network.
* Load balancing and scale groups for ec2 and lambdas.
* Provisioning with terraform

## Utilized Technologies

* EC2: AWS virtual compute technology.
* React: Front end Javascript library.
* Node: Javascript runtime.
* pm2: Process management for running webservers.
* API Gateway: AWS Managed API service.
* Lambda: AWS serverless functions.
* DynamoDB: AWS managed NoSQL database.
* ECR: AWS image repository.

## Author

William Hadden - *All Work*