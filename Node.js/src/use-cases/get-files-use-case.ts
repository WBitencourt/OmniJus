import { IFileRepository } from "../repositories/prisma/file-repository";

interface GetFilesUseCaseRequest {
  id?: string | undefined,
  createdAt?: Date | undefined,
  name?: string | undefined,
  size?: number | undefined,
  key?: string | undefined,
  url?: string | undefined,
  userID?: number | undefined,
  emailSend?: boolean | undefined,
}

export class GetFileUseCase {
  constructor(private filesRepository: IFileRepository) {}

  async execute() {

    const file = await this.filesRepository.read();

    return file;
  }

  async readWhere(data: GetFilesUseCaseRequest) {

    console.log(data);

    const file = await this.filesRepository.readWhere({
      id: data?.id, 
      createdAt: data?.createdAt,
      name: data?.name,
      size: data?.size,
      key: data?.key,
      url: data?.url,
      userID: data?.userID,
      emailSend: data?.emailSend,
    });

    return file;
  }
}