import { IFileAdapter } from "./file-adapter";
import multer, { FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
//import aws from 'aws-sdk';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import path from 'path';
import crypto from 'crypto';

import { Request } from 'express'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

interface IFile extends Express.Multer.File {
  key: string;
}

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} as S3ClientConfig);

const storageTypes = {
  local: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads'))
    },
    filename: (req: Request, file: IFile, cb: FileNameCallback): void  => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  }),
}

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads'),
  storage: process.env.STORAGE_TYPE === 's3' ? storageTypes['s3'] : storageTypes['local'],
  limits: {
    fileSize: 2 * 1024 * 1024 //2 Megabytes
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimes = [
      'application/pdf',
      'image/png',
      'image/jpg',
      'image/jpeg',
    ];

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};

export class FileAdapter implements IFileAdapter {
  upload() {
    return multer(multerConfig).single('file')
  }
}