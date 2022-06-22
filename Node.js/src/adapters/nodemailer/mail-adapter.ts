export interface ISendMailData {
  subject: string;
  body: string;
  attachments?: Object[];
}

export interface IMailAdapter {
  sendMail: (data: ISendMailData) => Promise<void>;
}
