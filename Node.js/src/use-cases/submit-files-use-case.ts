import { IMailAdapter } from "../adapters/nodemailer/mail-adapter";
import { IFileRepository } from "../repositories/prisma/file-repository";

interface SubmitFilesUseCaseRequest {
  name: string;
  size: number;
  key: string;
  url: string;
  userID: number;
  emailSend: boolean;
}

export class SubmitFileUseCase {
  constructor(
    private filesRepository: IFileRepository
  ) {}

  async execute(request: SubmitFilesUseCaseRequest) {
    const { name, size, key, url, userID, emailSend } = request;

    if(!name) {
      throw new Error('Name is required.')
    }

    if(size <= 0) {
      throw new Error('File is empty')
    }

    if(!key) {
      throw new Error('Key is required.')
    }

    if(!userID) {
      throw new Error('user is required.')
    }

    const file = await this.filesRepository.create({
      name,
      size,
      key,
      url: url ? url : `${process.env.RAILWAY_STATIC_URL}/files/${key}`,
      userID,
      emailSend
    })

    return file;
  }
}