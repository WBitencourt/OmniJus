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

interface Attachments {
  id: number;
  filename: String;
  path: String;
}

export class SubmitFileUseCase {
  constructor(
    private filesRepository: IFileRepository,
    private mailAdapter: IMailAdapter,
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
      url: url ? url : `${process.env.APP_URL}/files/${key}`,
      userID,
      emailSend
    })

    const fileNotSendToUser= await this.filesRepository.readWhere({userID, emailSend: false});

    if(!fileNotSendToUser) {
      
      return file;
    }

    const attachments: Attachments[] = fileNotSendToUser.map((file): Attachments => ({
      id: file.id,
      filename: file.name,
      path: file.url,
    }))

    await this.mailAdapter.sendMail({
      subject: 'Upload Múltiplo',
      body: [
        `<div>`,
        `<p>Texto aqui</p>`,
        `<p>Texto aqui</p>`,
        `</div>`,
      ].join(''),
      attachments
    })

    await this.filesRepository.updateWhere({emailSend: true}, {userID});

    return file;
  }
}