// config/deploy.js
/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3 = {
      accessKeyId: process.env['AWS_SPARE_IAM_JERE7054_ACCESS_KEY_ID'],
      secretAccessKey: process.env['AWS_SPARE_IAM_JERE7054_SECRET_ACCESS_KEY'],
      bucket: 'rarwe-production-jere7054',
      region: 'us-east-1'
    };
    ENV['s3-index'] = {
      accessKeyId: process.env['AWS_SPARE_IAM_JERE7054_ACCESS_KEY_ID'],
      secretAccessKey: process.env['AWS_SPARE_IAM_JERE7054_SECRET_ACCESS_KEY'],
      bucket: 'rarwe-production-jere7054',
      region: 'us-east-1'
    };
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
