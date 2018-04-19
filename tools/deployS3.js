/* eslint-disable */
import { chalkSuccess, chalkInfo, chalkError } from './chalkConfig';
import s3 from 's3';
import path from 'path';
import dotenv from 'dotenv';

const environment = process.env.ENV;
dotenv.config({ path: path.resolve(__dirname, `../.env.${environment}`) });

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
      console.log(chalkInfo(`Bucket to deploy: ${process.env.AWS_BUCKET}`));
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
          const client = s3.createClient({
            s3Options: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              region: process.env.AWS_REGION
            }
          });
          const params = {
            localDir: path.resolve(__dirname, '../dist'),
            deleteRemoved: true,
            s3Params: {
              Bucket: process.env.AWS_BUCKET,
              ACL: 'public-read'
            }
          };
          const uploader = client.uploadDir(params);
          uploader.on('error', function(err) {
            throw new Error(err.stack);
            process.exit(1);
          });
          uploader.on('end', function() {
            console.log(chalkSuccess('\nSUCCESS: ./dist folder was deployed to AWS S3'));
          });
        }
      });
    }
  });
} else {
  console.error(chalkError('Failed, you must select an environment to deploy.'));
  console.error(chalkInfo('Example: $ ENV=dev yarn deploy'));
}
