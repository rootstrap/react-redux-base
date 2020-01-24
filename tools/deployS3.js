import path from 'path';
import dotenv from 'dotenv';

import { chalkSuccess, chalkInfo, chalkError, chalkProcessing } from './chalkConfig';
import { consoleQuestion } from './helpers';
import s3 from './s3';

const DIST_PATH = '../dist';
const environment = process.env.ENV || 'prod';
dotenv.config({ path: path.resolve(__dirname, `../.env.${environment}`) });

if (!environment) {
  console.error(chalkError('Failed, you must select an environment to deploy.'));
  console.error(chalkInfo('Example: $ ENV=dev yarn deploy'));
  process.exit(1);
}

// Get current branch from git
const exec = require('child_process').exec;
exec('git symbolic-ref --short HEAD', async (err, stdout, stderr) => {
  if (err) {
    console.error(chalkError('ERROR(git): check your local branch.'));
    process.exit(1);
  } 

  const branch = stdout;
  console.log(chalkInfo(`Environment: ${environment}`));
  console.log(chalkInfo(`Bucket to deploy: ${process.env.AWS_BUCKET}`));
  console.log(chalkInfo(`Branch you're in: ${branch}`));

  const answer = await consoleQuestion('Do you want to continue? (y/n): ');
  if (answer !== 'y') {
    console.error(chalkError('Operation canceled.'));
    process.exit(1);
  }

  console.log(chalkInfo('\nDeploying to AWS S3'));
  const client = new s3(DIST_PATH);
  try {
    console.log(chalkProcessing('\nGetting bucket data...'));
    const bucketObjects = await client.getBucketObjects();
    if (bucketObjects.length > 0) {
      console.log(chalkProcessing('\nClearing bucket...'));
      await client.clearBucket(bucketObjects);
    }

    console.log(chalkProcessing('\nUploading files...'));
    await client.syncBucket();
    const website = await client.getBucketWebsite();
    console.log(chalkInfo(
      `\nURL: ${website || 'enable static website hosting to see the URL'}`
    ));
    console.log(chalkSuccess('\nSUCCESS: directory deployed to AWS S3'));
  } catch(err) {
    throw new Error(err);
    process.exit(1);
  }
});
