import schedule from 'node-schedule';
import { FileRepository } from '../repositories/prisma/prisma-file-repository';
import { NodemailerMailAdapter } from '../adapters/nodemailer/nodemailer-mail-adapter';
import { SendEmailFileUseCase } from '../use-cases/send-email-files-use-case';

export async function sendEmail() {
  schedule.scheduleJob(process.env.TIME_SEND_EMAIL as string, async () => {
    console.log("Rodando a cada 5 minutos")

    const fileRepository = new FileRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
  
    const sendEmailFileUseCase = new SendEmailFileUseCase(
      fileRepository,
      nodemailerMailAdapter
    );

    sendEmailFileUseCase.execute();
  })
}
