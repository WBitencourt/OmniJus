import express from 'express';
import { FileAdapter } from './adapters/multer/multer-file-adapter';
import { FileRepository } from './repositories/prisma/prisma-file-repository';
import { SubmitFileUseCase } from './use-cases/submit-files-use-case';
import { GetFileUseCase } from './use-cases/get-files-use-case';
import { DeleteFileUseCase } from './use-cases/delete-files-use-case';
import { Request, Response } from 'express'
//import fs from 'fs';
//import path from 'path';

export const routes = express.Router();

const fileAdapter = new FileAdapter();

interface MulterRequest extends Request {
  file: any;
}

routes.get('/files/user/:id', async (req, res) => {

  console.log(req.headers.authorization)

  try {
    if(!Number(req.params.id)) {
      throw new Error("Invalid ID")
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }

  try {
    const fileRepository = new FileRepository();
  
    const getFileUseCase = new GetFileUseCase(fileRepository);
  
    const data = await getFileUseCase.readWhere({userID: parseInt(req.params.id)});
    
    return res.status(201).send(data);

  } catch {
    return res.status(500).send('Fail to GET files.');
  }
});

routes.post('/files', fileAdapter.upload(), async (req: Request, res: Response) => {
  try {
    const {originalname: name, size, key, location: url = ''}  = (req as MulterRequest).file;

    const fileRepository = new FileRepository();
  
    const submitFileUseCase = new SubmitFileUseCase(fileRepository);
  
    const data = await submitFileUseCase.execute({
      name,
      size,
      key,
      url,
      userID: parseInt(req.body.userID),
      emailSend: false,
    })
  
    return res.status(201).send(data);
  } catch {
    return res.status(500).send('Fail to POST files.');
  }
});

routes.delete('/files/:id', async (req, res) => {

  try {
    if(!Number(req.params.id)) {
      throw new Error("Invalid ID.")
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }

  try {
    const fileRepository = new FileRepository();

    const getFileUseCase = new GetFileUseCase(fileRepository);
  
    const file = await getFileUseCase.readWhere({id: req.params.id});
  
    const id = file[0].id.toString();
    const key = file[0].key.toString();
  
    const deleteFileUseCase = new DeleteFileUseCase(fileRepository);
  
    await deleteFileUseCase.execute({id, key});
  
    return res.status(200).send();
  } catch (error: any){
    return res.status(500).send('Fail to DELETE file.' + error.message);
  }
});

routes.get('/', async (req, res) => {
  // const fileRepository = new FileRepository();

  // const getFileUseCase = new GetFileUseCase(fileRepository);

  // const data = await getFileUseCase.readWhere({emailSend: true});

  // console.log(data);

  //console.log(get)
  //GOOD: 4b1b38e9f7c88b9de1aea3cab5536593-spiderman.jpg
  //BAD: cc2c66643e9313aa7ca4838507f0926a-filecorrupted.jpg

  // fs.readFile(path.resolve(__dirname, '..' , 'temp', 'uploads', 'cc2c66643e9313aa7ca4838507f0926a-filecorrupted.jpg'), (err, pdfBuffer) => {
  //   if (err) {
  //     console.log("error")
  //   }
  // })

  return res.status(200).send();
});
