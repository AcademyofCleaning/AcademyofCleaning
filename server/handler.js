'use strict';

module.exports.landing = async event => {
  return {
    statusCode: 200,
    headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    body: JSON.stringify(
      {
        message: 'Hello World',
      },
      null,
      2
    ),
  };
};

module.exports.profileInsertion = async event => {
  return {
    statusCode: 200,
    headers:{
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Methods" : "GET",
      "Access-Control-Allow-Origin" : "http://localhost:3000"
    },
    body: JSON.stringify(
      {
        //assume in data format that node.js is familiar with
        //insert statements here, save results of profileFOrmSubmission in 
        //variable and send to client here 
      },
      null,
      2
    ),
  };
};
