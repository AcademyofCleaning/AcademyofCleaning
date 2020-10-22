# Academy-of-Cleaning

## Accessing/Editing Server Code
We will be using the Serverless Framework to deploy our server code
pre-requiste: node.js is already installed on your machine
* Install serverless [here](https://www.serverless.com/framework/docs/providers/aws/guide/installation/)
* The serverless.yml file is what you edit to manipulate endpoints and API Gateway
* The node.js files in the server folder is what is used as the "server" code
* You will need to set up an access key from AWS in order to deploy server code
    * speak to a administator to gain an IAM access and secret key
    * follow instructions [here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-serverless-config-credentials-command) to set up credentials
* `serverless deploy` is used to deploy code to the server to AWS

## Active endpoints
* ANY - https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/home 
