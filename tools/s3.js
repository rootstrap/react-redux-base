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

  clearBucket() {
    return new Promise((resolve, reject) => {
      this.client.listObjects({ Bucket: this.bucket }, (err, data) => {
        if (err) {
          reject(`error listing bucket objects ${err}`);
          return;
        }
        
        const items = data.Contents;

        if (items.length === 0) {
          resolve();
        }

        items.forEach((item, index) => {
          const deleteParams = { Bucket: this.bucket, Key: item.Key };
          this.client.deleteObject(deleteParams, (err, data) => {
            if (err) {
              reject(`delete err ${deleteParams.Key}`);
            }
            if (index === items.length - 1) {
              resolve();
            }
          })
        })
      })
    })
  }

  syncDir(distPath) {
    return new Promise((resolve, reject) => {
      const folderPath = path.join(__dirname, distPath);

      fs.readdir(folderPath, (err, files) => {
        if(!files || files.length === 0) {
          reject(`provided folder '${distPath}' is empty or does not exist.`);
          return;
        }

        files.forEach((fileName, index) => {
          const filePath = path.join(folderPath, fileName);

          fs.readFile(filePath, (error, fileContent) => {
            if (error) { reject(error); }

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

            // upload file to S3
            this.client.putObject(s3Params, (err) => {
              if (err) {
                reject(err)
              } else {
                if (index === files.length - 1) {
                  resolve();
                }
              }
            });
          });
        });
      });
    })
  }
}

export default s3;
