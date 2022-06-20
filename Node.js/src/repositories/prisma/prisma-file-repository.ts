import { prisma } from '../../prisma';
import { IFileCreateData, IFileRepository, IFileReturnDataCreate} from "./file-repository";

export class FileRepository implements IFileRepository {
  async create({name, size, key, url, userID}: IFileCreateData) {
    const file = await prisma.files.create({
      data: {
        name,
        size,
        key,
        url,
        userID,
      }
    });

    console.log("Inicio ******************")
    console.log(file)
    console.log("Fim ******************")
    return <IFileReturnDataCreate>file;
  }
}