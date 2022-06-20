import { IMailAdapter } from "../adapters/nodemailer/mail-adapter";
import { IFileRepository } from "../repositories/prisma/file-repository";

interface SubmitFilesUseCaseRequest {
  name: string;
  size: number;
  key: string;
  url: string;
  userID: number;
}

export class SubmitFileUseCase {
  constructor(
    private filesRepository: IFileRepository,
    private mailAdapter: IMailAdapter,
  ) {}

  async execute(request: SubmitFilesUseCaseRequest) {
    const { name, size, key, url, userID } = request;

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
      url,
      userID
    })

    await this.mailAdapter.sendMail({
      subject: 'Upload Múltiplo',
      body: [
        `<div>`,
        `<p>Texto aqui</p>`,
        `<p>Texto aqui</p>`,
        `</div>`,
      ].join('')
    })

    return file;
  }
}