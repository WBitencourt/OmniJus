import { IFileRepository } from "../repositories/prisma/file-repository";

interface GetFilesUseCaseRequest {
  id: string,
}

export class GetFileUseCase {
  constructor(private filesRepository: IFileRepository) {}

  async execute() {

    const file = await this.filesRepository.read();

    return file;
  }

  async getID({id}: GetFilesUseCaseRequest) {

    const file = await this.filesRepository.readWhere({id});

    return file;
  }
}