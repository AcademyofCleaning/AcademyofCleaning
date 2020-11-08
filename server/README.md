# Accessing/Editing Server Code
We will be using the Serverless Framework to deploy our server code
pre-requiste: node.js is already installed on your machine
* Install serverless `npm install -g serverless`
* The serverless.yml file is what you edit to manipulate endpoints and API Gateway
* The node.js files in the server folder is what is used as the "server" code
* You will need to set up an access key from AWS in order to deploy server code
    * speak to a administator to obtain credentials to sign into AWS Console
    * Sign In to AWS Console, navigate to `Academy of Cleaning` in the top nav > `My Security Credentials` and click `Create New Access Key`
    * follow instructions [here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-serverless-config-credentials-command) to set up credentials
* `cd` into the server dir and run `serverless deploy` to deploy code to the server to AWS

## Active endpoints
* ANY - https://bixe448nsa.execute-api.us-west-1.amazonaws.com/dev/home
3.amazonaws.com/dev/searchCandidates
    * [REQUIRED] URL Param id 

```        
    RESPONSE    
        {
            "result": {
            	{
<!--                 "profile_id": ProfileID,
                "first_name": FirstName,
                "last_name": LastName,
                "contact_num": PhoneNum,
                "contact_ext": PhoneExt, -->
                
                }
            }
        }
```

## Deploying the Application
* If you wish to deploy, push to the branch 'deploy-to-heroku' and our pipeline will run
* A demo can be accessed here: https://serene-ocean-22768.herokuapp.com/
