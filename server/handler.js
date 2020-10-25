'use strict';

module.exports.landing = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World',
      },
      null,
      2
    ),
  };
};
