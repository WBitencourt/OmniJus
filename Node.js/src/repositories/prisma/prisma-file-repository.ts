import { prisma } from '../../prisma';
import 
{ 
  IFileCreateData,
  IFileRepository, 
  IFileReturnDataCreate, 
  IFileDeleteData,
  IFileWhereConditions,
  IFileUpdateConditions
} 
from "./file-repository";

export class FileRepository implements IFileRepository {
  async create({name, size, key, url, userID, emailSend}: IFileCreateData) {  
    const file = await prisma.files.create({
      data: {
        name,
        size,
        key,
        url,
        userID,
        emailSend,
      }
    });

    return <IFileReturnDataCreate>file;
  }

  async read() {
    const file = await prisma.files.findMany();

    return <IFileReturnDataCreate[]>file;
  }

  async readWhere(where: IFileWhereConditions) {
    
    const id = (where?.id === typeof undefined || !Number(where?.id)) ? undefined : parseInt(where.id as string)

    const file = await prisma.files.findMany({
      where: {
        id,
        createdAt: where?.createdAt,
        name: where?.name,
        size: where?.size,
        key: where?.key,
        url: where?.url,
        userID: where?.userID,
        emailSend: where?.emailSend,
      }
    });

    return <IFileReturnDataCreate[]>file;
  }

  async updateWhere(data: IFileUpdateConditions, where: IFileWhereConditions) {
    
    const id = (where?.id === typeof undefined || !Number(where?.id)) ? undefined : parseInt(where.id as string)

    await prisma.files.updateMany({
      where: {
        id,
        createdAt: where?.createdAt,
        name: where?.name,
        size: where?.size,
        key: where?.key,
        url: where?.url,
        userID: where?.userID,
      },
      data: {
        name: data?.name,
        key: data?.key,
        url: data?.url,
        emailSend: data?.emailSend
      },
    });
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