'use strict';

module.exports.landing = async event => {
  return {
    statusCode: 200,
    headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*"
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
