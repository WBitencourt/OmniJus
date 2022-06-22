import { IMailAdapter, ISendMailData } from "./mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9c72941196cf1a",
    pass: "5f4d1638a284a1"
  }
});

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({subject, body, attachments}: ISendMailData) {
    await transport.sendMail({
      from: 'Equipe Omnijus <suporte@suporte.com>',
      to: 'Wendell Bitencourt <wendell.gbitencourt@gmail.com>',
      subject,
      html: body,
      attachments,
    });
  };
}