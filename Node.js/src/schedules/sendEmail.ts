import schedule from 'node-schedule';

export async function sendEmail() {
  schedule.scheduleJob(process.env.TIME_SEND_EMAIL as string, () => {
    console.log("Rodando a 5 minutos")

    // const fileNotSendToUser= await this.filesRepository.readWhere({userID, emailSend: false});

    // if(!fileNotSendToUser) {
      
    //   return file;
    // }

    // const attachments: Attachments[] = fileNotSendToUser.map((file): Attachments => ({
    //   id: file.id,
    //   filename: file.name,
    //   path: file.url,
    // }))

    // await this.mailAdapter.sendMail({
    //   subject: 'Upload Múltiplo',
    //   body: [
    //     `<div>`,
    //     `<p>Texto aqui</p>`,
    //     `<p>Texto aqui</p>`,
    //     `</div>`,
    //   ].join(''),
    //   attachments
    // })

    // await this.filesRepository.updateWhere({emailSend: true}, {userID});
  })
}
