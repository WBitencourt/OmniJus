import { IFileAdapter } from "./file-adapter";
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';

import { Request } from 'express'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'temp', 'uploads'))
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void  => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
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