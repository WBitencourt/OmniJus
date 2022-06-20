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

export interface IFileDeleteData {
  id: string,
}

export interface IFileWhereConditions {
  id: string,
  createdAt?: Date,
  name?: String,
  size?: number,
  key?: String,
  url?: String,
  userID?: number
}

export interface IFileRepository {
  create: (data: IFileCreateData) => Promise<IFileReturnDataCreate>;
  read: () => Promise<IFileReturnDataCreate[]>;
  delete: (data: IFileDeleteData) => Promise<void>;
  readWhere: (data: IFileWhereConditions) => Promise<IFileReturnDataCreate[]>;
}