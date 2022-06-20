import { prisma } from '../../prisma';
import 
{ 
  IFileCreateData,
  IFileRepository, 
  IFileReturnDataCreate, 
  IFileDeleteData,
  IFileWhereConditions
} 
from "./file-repository";

export class FileRepository implements IFileRepository {
  async create({name, size, key, url, userID}: IFileCreateData) {
    
    if (!url) {
      url = `${process.env.APP_URL}/files/${key}`
    }
    
    const file = await prisma.files.create({
      data: {
        name,
        size,
        key,
        url,
        userID,
      }
    });

    return <IFileReturnDataCreate>file;
  }

  async read() {
    const file = await prisma.files.findMany();

    return <IFileReturnDataCreate[]>file;
  }

  async readWhere(data: IFileWhereConditions) {

    if (!Number(data.id)) {
      throw new Error("ID is not a valid number")
    }

    const file = await prisma.files.findMany({
      where: {
        id: parseInt(data.id),
      },
    });

    return <IFileReturnDataCreate[]>file;
  }

  async delete({id}: IFileDeleteData) {

    if (!Number(id)) {
      throw new Error("ID is not a valid number")
    }

    await prisma.files.delete(
      {
        where: {
          id: parseInt(id)
        },
      }
    );
  }
}