import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

class s3 {
  constructor() {
    this.client = new S3({
      signatureVersion: 'v4',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    this.bucket = process.env.AWS_BUCKET;
  }

  // Private
  readdir(folderPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (!files || files.length === 0) {
          reject(new Error('provided folder is empty or does not exist.'));
        }
        if (err) reject(err);
        else resolve(files);
      });
    });
  }

  // Private
  uploadFile = fileName => new Promise((resolve, reject) => {
    const filePath = path.join(this.folderPath, fileName);
    fs.readFile(filePath, (error, fileContent) => {
      if (error) reject(error);
      const s3Params = {
        Bucket: this.bucket,
        Key: fileName,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: mime.getType(fileName)
      };

      if (/\.js$|\.css$/.test(fileName)) {
        s3Params.ContentEncoding = 'gzip';
      }

      this.client.putObject(s3Params, (err, data) => {
        if (err) {
          console.log(`Error uploading ${fileName} ${err.code}`);
          return reject();
        }

        return resolve(data);
      });
    });
  })

  // Private
  deleteItem = (item) => {
    const deleteParams = { Bucket: this.bucket, Key: item.Key };
    return new Promise((resolve, reject) =>
      this.client.deleteObject(deleteParams, (error) => {
        if (error) return reject(error);
        return resolve();
      }));
  };

  async clearBucket() {
    this.client.listObjects({ Bucket: this.bucket }, (err, data) => {
      if (err) {
        return reject(`error listing bucket objects ${err}`);
      }
      const items = data.Contents;
      if (items.length === 0) {
        return;
      }
      const deleteItemsPromises = items.map(this.deleteItem);
      return Promise.all(deleteItemsPromises);
    });
  }
  async syncDir(distPath) {
    this.folderPath = path.join(__dirname, distPath);
    const files = await this.readdir(this.folderPath);
    const uploadItemsList = files.map(this.uploadFile);
    return Promise.all(uploadItemsList);
  }
}

export default s3;
