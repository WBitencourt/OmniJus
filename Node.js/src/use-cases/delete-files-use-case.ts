import { IFileRepository } from "../repositories/prisma/file-repository";
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';

interface DeleteFilesUseCaseRequest {
  id: string,
  key: string,
}

const s3 = new aws.S3();

export class DeleteFileUseCase {
  constructor(private filesRepository: IFileRepository) {}

  async execute({id, key}: DeleteFilesUseCaseRequest) {
    if (process.env.STORAGE_TYPE === 's3') {
      await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME as string,
        Key: key,
      }).promise();
    }

    if (process.env.STORAGE_TYPE === 'local') {
      fs.unlinkSync(path.resolve(__dirname, '..', '..', 'temp', 'uploads', key));
    }

    const file = await this.filesRepository.delete({id});

    return file;
  }
}