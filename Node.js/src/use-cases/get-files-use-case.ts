import { IFileRepository } from "../repositories/prisma/file-repository";

interface GetFilesUseCaseRequest {
  id?: string | undefined,
  createdAt?: Date | undefined,
  name?: string | undefined,
  size?: number | undefined,
  key?: string | undefined,
  url?: string | undefined,
  userID?: number | undefined,
  emailRead?: boolean | undefined,
}

export class GetFileUseCase {
  constructor(private filesRepository: IFileRepository) {}

  async execute() {

    const file = await this.filesRepository.read();

    return file;
  }

  async readWhere(data: GetFilesUseCaseRequest) {

    const file = await this.filesRepository.readWhere({
      id: data.id, 
      userID: data.userID
    });

    return file;
  }
}