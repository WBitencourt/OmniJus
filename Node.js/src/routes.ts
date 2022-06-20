import express from 'express';
import { FileAdapter } from './adapters/multer/multer-file-adapter';
import { FileRepository } from './repositories/prisma/prisma-file-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFileUseCase } from './use-cases/submit-files-use-case';
import { GetFileUseCase } from './use-cases/get-files-use-case';
import { DeleteFileUseCase } from './use-cases/delete-files-use-case';
import { Request, Response } from 'express'

export const routes = express.Router();

const fileAdapter = new FileAdapter();

interface MulterRequest extends Request {
  file: any;
}

routes.get('/files', async (req, res) => {
  const fileRepository = new FileRepository();

  const getFileUseCase = new GetFileUseCase(fileRepository);

  const files = await getFileUseCase.execute();

  return res.status(201).send({data: files});
});

routes.post('/files', fileAdapter.upload(), async (req: Request, res: Response) => {
  console.log(req.file)
  const {originalname: name, size, key, location: url = ''}  = (req as MulterRequest).file;

  const fileRepository = new FileRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFileUseCase = new SubmitFileUseCase(
    fileRepository,
    nodemailerMailAdapter
  );

  const file = await submitFileUseCase.execute({
    name,
    size,  
    key, 
    url,
    userID: 1,
  })

  return res.status(201).send({data: file});
});

routes.delete('/files/:id', async (req, res) => {
  const reqID = req.params.id;

  const fileRepository = new FileRepository();

  const getFileUseCase = new GetFileUseCase(fileRepository);

  const file = await getFileUseCase.getID({id: reqID});

  const id = file[0].id.toString();
  const key = file[0].key.toString();

  const deleteFileUseCase = new DeleteFileUseCase(fileRepository);

  console.log(file[0].key)

  await deleteFileUseCase.execute({id, key});

  return res.status(200).send();
});

routes.get('/', (req, res) => {
  return res.status(200).send('HTTP server running!');
});
