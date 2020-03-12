import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import { consoleQuestion, JS_OR_CSS_REGEX } from './helpers';

class s3 {
  constructor(distFolder) {
    this.distPath = path.join(__dirname, distFolder);
    this.client = new S3({
      signatureVersion: 'v4',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    this.bucket = process.env.AWS_BUCKET;
  }

  async getBucketObjects() {
    try {
      const bucketData = await this.client.listObjects({ Bucket: this.bucket }).promise();
      return bucketData.Contents;
    } catch (err) {
      throw new Error(`error listing bucket objects ${err}`);
    }
  }

  async getBucketWebsite() {
    try {
      const bucketWebsiteData = await this.client.getBucketWebsite({ Bucket: this.bucket }).promise();
      return `http://${this.bucket}.s3-website.${process.env.AWS_REGION}.amazonaws.com`;
    } catch (err) {
      return '';
    }
  }

  async clearBucket(bucketObjects) {
    try {  
      const promises = bucketObjects.map(({ Key }) =>
        this.client.deleteObject({ Bucket: this.bucket, Key }).promise()
      );
      await Promise.all(promises);
    } catch (err) {
      throw new Error(`error deleting bucket objects ${err}`);
    }
  }

  sendFile (filePath, mimeType, promises) {
    try {
      const key = filePath.substring(this.distPath.length + 1);
      const params = {
        Bucket: this.bucket,
        ACL: 'public-read',
        Key: key,
        Body: fs.readFileSync(filePath),
        ContentType: mimeType,
      };
      if (JSON.parse(process.env.GZIP_ENABLED) && JS_OR_CSS_REGEX.test(key)) {
        params.ContentEncoding = 'gzip';
      }
      promises.push(this.client.putObject(params).promise());
    } catch (err) {
      throw new Error(`error uploading bucket objects ${err}`);
    }
  }

  walkSync (currentDirPath, promises) {
    const directoryList = fs.readdirSync(currentDirPath);
    directoryList.forEach(
      (directoryItem) => this.walkFileOrDir(currentDirPath, directoryItem, promises)
    );
  }

  walkFileOrDir(currentDirPath, name, promises) {
    const entryPath = path.join(currentDirPath, name);
    const stat = fs.statSync(entryPath);
    if (stat.isFile()) {
      this.sendFile(entryPath, mime.getType(name), promises);
    } else if (stat.isDirectory()) {
      this.walkSync(entryPath, promises);
    }
  }

  async syncBucket() {
    const promises = [];
    this.walkSync(this.distPath, promises);
    await Promise.all(promises)
  }
}

export default s3;
