/* eslint-disable */
import { chalkSuccess, chalkInfo } from './chalk';

const environment = process.argv[2];

// Set the buckets for your app
const devBucket = 's3://dev-your-app';
const devRegion = 'dev-region';
const prodBucket = 's3://prod-your-app';
const prodRegion = 'prod-region';

if (environment) {
  // Get current branch from git
  const exec = require('child_process').exec;
  exec('git symbolic-ref --short HEAD', function (err, stdout, stderr) {
    if (err) {
      throw new Error('ERROR(git): check your local branch.');
      process.exit(1);
    } else {
      const branch = stdout;
      console.log(chalkInfo(`Environment: ${environment}`));
      console.log(chalkInfo(`Branch you're in: ${branch}`));

      // Config readline
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      // Confirm deploy action
      rl.question(chalkInfo('Do you want to continue? (y/n): '), function(answer) {
        rl.close();
        if (answer === 'y') {
          console.log(chalkInfo('Deploying to AWS S3...'));
          let bucket;
          let region;
          if (environment === 'staging') {
            bucket = devBucket;
            region = devRegion;
          } else if (environment === 'production') {
            bucket = prodBucket;
            region = prodRegion;
          } else {
            throw new Error('Invalid environment parameter. Options are: staging and production');
            process.exit(1);
          }
          const flags = `--region ${region} --acl public-read --delete --cache-control`;
          const deploy = require('child_process').exec;
          deploy(`aws s3 sync dist ${bucket} ${flags} 'public, no-cache, max-age=43200'`,
          function (err, stdout, stderr) {
            if (err) {
              throw new Error('ERROR(S3): problem deploying to AWS S3.');
              process.exit(1);
            };
            console.log(chalkSuccess('SUCCESS: ./dist folder was deployed to AWS S3'));
          });
        }
      });
    }
  });
}
