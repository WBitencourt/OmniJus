import express from 'express';
import { FileAdapter } from './adapters/multer/multer-file-adapter';
import { FileRepository } from './repositories/prisma/prisma-file-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFileUseCase } from './use-cases/submit-files-use-case';
import { Request, Response } from 'express'

export const routes = express.Router();

const fileAdapter = new FileAdapter();

routes.post('/files', fileAdapter.upload(), async (req: Request, res: Response) => {
  console.log(req.file)

  const fileRepository = new FileRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFileUseCase = new SubmitFileUseCase(
    fileRepository,
    nodemailerMailAdapter
  );

  const file = await submitFileUseCase.execute({
    name: req.file?.originalname || '', 
    size: req.file?.size || 0,  
    key: req.file?.filename || '', 
    url: '',
    userID: 1,
  })

  return res.status(201).send({data: file});
});

routes.get('/', (req, res) => {
  return res.status(200).send('HTTP server running!');
});
