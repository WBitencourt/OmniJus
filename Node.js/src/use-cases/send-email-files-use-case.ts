import { IMailAdapter } from "../adapters/nodemailer/mail-adapter";
import { IFileRepository } from "../repositories/prisma/file-repository";

interface Attachments {
  id: number;
  filename: String;
  path: String;
}

interface File {
  id: string,
  createdAt: Date,
  name: string,
  size: number,
  key: string,
  url: string,
  userID: number,
  emailSend: boolean,
}

export class SendEmailFileUseCase {
  constructor(
    private filesRepository: IFileRepository,
    private mailAdapter: IMailAdapter,
  ) {}

  async execute() {
    const fileNotSendToUser = await this.filesRepository.readWhere({emailSend: false, userID: 20});

    if(fileNotSendToUser.length === 0) {     
      return;
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

    await this.filesRepository.updateWhere({emailSend: true}, {userID: 20});
  }
}