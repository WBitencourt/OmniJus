export interface IFileCreateData {
  name: string;
  size: number;
  key: string;
  url: string;
  userID: number;
}

export interface IFileReturnDataCreate {
  id: number,
  createdAt: Date,
  name: String,
  size: number,
  key: String,
  url: String,
  userID: number
}

export interface IFileRepository {
  create: (data: IFileCreateData) => void;
}